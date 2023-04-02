
import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllFrontMatterByType, getAllPostIdsByType, getPostData } from '../../lib/posts'
import BackToTop from '../../components/back-to-top'
import PostContent  from '../../components/post-content'
import HotLoad  from '../../components/hot-load'
import { useEffect, useState } from 'react'

const Post = ({ post, prev, next, id }: any) => {
    const [postData, setPostData] = useState(post)
    
    useEffect(()=>{
        setPostData(post)
    },[post])

    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <PostContent post={postData} prev={prev} next={next} />
            {/* <HotLoad setPost={setPostData} id={id} />  */}
            <BackToTop />
        </Layout>
    )
}

export default Post

export async function getStaticProps({ params }: any) {
  console.log('id:', params)
    const id = ['series', ...params.id]
    const slug = id.join('/')
    const post = await getPostData(id)
    const allPosts = getAllFrontMatterByType('series')
    const index = allPosts.findIndex(item => {
        return item.slug === slug
    })

    return {
        props: {
            id:id,
            post,
            prev: allPosts[index + 1] || null,
            next: allPosts[index - 1] || null,
        }
    }
}

export async function getStaticPaths() {
    const paths = getAllPostIdsByType('series')
    console.log('paths: == ', paths)
    return {
        paths,
        fallback: false
    }
}