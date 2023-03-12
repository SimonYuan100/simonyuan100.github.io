import Layout from '../../components/layout'
import HotLoad from '../../components/hot-load'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import { useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next';

export default function Post({ postData }: {
  postData: {
    title: string,
    date: string,
    author: string,
    contentHtml: string
  }
}) {
  const [postInfo, setPostInfo] = useState(postData)
  return (
    <Layout>
      <Head>{postInfo.title}</Head>
      {postInfo.title}
      <br />
      by {postInfo.author}
      <br />
      {postInfo.date}
      <div dangerouslySetInnerHTML={{ __html: postInfo.contentHtml }}></div>
      <HotLoad setPost={setPostInfo} params={postInfo} />
    </Layout>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible value for id
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params?.id as string)
  console.log('postData', postData)
  return {
    props: {
      postData,
    },
  }
}
