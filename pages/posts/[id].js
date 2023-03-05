import Layout from '../../components/layout'
import HotLoad from '../../components/HotLoad'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import { useState } from 'react'

export default function Post({ postData }) {
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
export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id)
  console.log('postData', postData)
  return {
    props: {
      postData,
    },
  }
}
