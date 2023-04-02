import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { BASE_URL } from '../config'
import { upperCaseFirst } from 'upper-case-first'
import { globSync } from 'glob'
import config from '../config/index.json'
import remarkGfm from 'remark-gfm'
import glob from "glob"
import prism from 'remark-prism';
import { unified } from "unified";
import remarkParse from "remark-parse/lib";
import { generateHeadingId, generateToc, remarkCodepen, remarkImage } from './remark-plugins'


const POSTS_DIR = path.join(BASE_URL, 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  console.log('POSTS_DIR', POSTS_DIR)
  const fileNames = fs.readdirSync(POSTS_DIR)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(POSTS_DIR, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIdsByType(type = 'posts') {
  const dir = path.join(BASE_URL, type)
  const fileNames = fs.readdirSync(dir)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '').split('/'),
      },
    }
  })
}

// export async function getPostData(id: string, type = 'blogs') {
//   const fullPath = path.join(BASE_URL, `${type}/${id}.md`)
//   const fileContents = fs.readFileSync(fullPath)
//   const matterResult = matter(fileContents)
//   const processedContent = await remark()
//     .use(html)
//     .process(matterResult.content)
//   const contentHtml = processedContent.toString()
//   return {
//     id,
//     contentHtml,
//     ...matterResult.data,
//   }
// }
export async function getPostData(id: any) {

  const fullPath = path.join(BASE_URL, `${id.join('/')}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(html, { allowDangerousHtml: true, sanitize: false })
      .use(prism)
      .use(remarkImage, { perfix: id })
      .use(remarkCodepen as any)
      .use(generateHeadingId as any)
      .use(generateToc as any)
      .process(matterResult.content);

  const contentHtml = htmlTransform(processedContent.toString())

  return {
      id,
      contentHtml,
      words: matterResult.content.replace(/\s/gm,'').length,
      toc: processedContent.data.toc,
      ...JSON.parse(JSON.stringify(matterResult.data)),
  };
}

function htmlTransform(html: string): string {
  html = html.replace(/<table>([\s\S]+?)<\/table>/igm, "<div class=\"table-responsive\"><table>$1</table></div>")
  html = html.replace(/<a/img, '<a target="_blank" target="_blank" class="ext-link"')
  return html
}

export function getAllFrontMatterByType(type = 'all'): any[] {

  const dir = type === 'all' ? '**' : [ type ]
  const allFrontMatter: any[] = []

  const fileNames = globSync(`${dir}/*.md`, { cwd: BASE_URL, absolute: true })
  console.log('fileNames', fileNames)
  fileNames.forEach((file) => {
    if (path.extname(file) !== '.md') {
        return
    }
    const source = fs.readFileSync(file, 'utf8')
    const { data: frontmatter } = matter(source)
    const isDraft = process.env.NODE_ENV === 'development' ? false : frontmatter.draft === true

    if (isDraft === false ) {
        allFrontMatter.push({
            ...frontmatter,
            path: file.split('contents')[1].replace(/\.(mdx|md)/, '').replace('/posts/', '/blogs/'),
            slug: path.relative(frontmatter.series ? BASE_URL : BASE_URL + '/posts', file).replace(/\.(mdx|md)/, ''),
            date: frontmatter.date,
        })
    }
  })
  return allFrontMatter.sort((x, y) => x.date - y.date)
}


export function getAllTags() {
  const allPosts = getAllFrontMatterByType('all')
  const data: any = {}

  allPosts.forEach(post => {
      const { tags = [] } = post
      tags.forEach((tag: string) => {
          const key = tag.toLowerCase()
          if (data[key]) {
              data[key].count++
              data[key].posts.push(post)
          } else {
              data[key] = { name: tag, title: upperCaseFirst(tag), count: 1, posts: [post] }
          }
      });
  })

  const list = Array.from(Object.keys(data), k => {
      return data[k]
  })

  list.sort((a, b) => b.count - a.count)

  return list
}

export function getAllSeries() {
  const allPosts = getAllFrontMatterByType('series')
  const data: any = {}

  config.series.forEach((s: any) => {
      data[s.name] = {
          ...s,
          count: 0,
          articles: []
      }
  });

  allPosts.reverse()
  allPosts.forEach(post => {
      if (post.type === 'series') {
          data[post.series].count++
          data[post.series].articles.push(post)
      }
  })

  const list = Array.from(Object.keys(data), k => {
      return data[k]
  })

  return list
}
