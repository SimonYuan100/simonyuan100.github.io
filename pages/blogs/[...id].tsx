import Layout from '../../components/layout'
import HotLoad from '../../components/hot-load'
import { getAllPostIdsByType, getPostData, getAllFrontMatterByType } from '../../lib/posts'
import Head from 'next/head'
import { useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next';
import PostContent from '../../components/post-content'

export default function Post({ id, post, prev, next }: {
    id: string[],
    post: any,
    prev: object,
    next: object
}) {
  const [postInfo, setPostInfo] = useState(post)
  return (
    <Layout>
      <Head>{postInfo.title}</Head>
      <PostContent post={postInfo} prev={prev} next={next} />
      <HotLoad setPost={setPostInfo} params={postInfo} />
    </Layout>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible value for id
  const paths = getAllPostIdsByType()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ( { params } ) => {
  // Fetch necessary data for the blog post using params.id
  console.log('params:', params)
  const slug = params.id.join('/')
    const id = ['posts', ...params.id]
    const post = await getPostData(id)
    const allPosts = getAllFrontMatterByType('posts')
    const index = allPosts.findIndex(item => {
        return item.slug === slug
    })

    return {
        props: {
            id,
            post,
            prev: allPosts[index + 1] || null,
            next: allPosts[index - 1] || null,
        }
    }
}
