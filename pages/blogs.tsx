
import Head from 'next/head'

import Layout from '../components/layout'
import { getAllFrontMatterByType } from '../lib/posts'
import  BackToTop from '../components/back-to-top'
import PostList  from '../components/post-list'
import Pagination from '../components/post-pagination'
import { PAGE_SIZE } from '../config'
import Banner from '../components/banner'

const Post = ({ posts, pageSize, total, pageNumber }: any) => {

    return (
        <Layout>
            <Head>
                <title>blogs</title>
            </Head>

            {
                pageNumber < 2 ? <Banner title='博文' abstract={`初极狭，才通人。复行数十步，豁然开朗。`} tag={`${total} 篇`} /> : null
            }

            <main className='mx-5 md:mx-20 '>
                <PostList posts={posts} />
                <Pagination {...{ pageSize, total, pageNumber }} />
            </main>
            <BackToTop />
        </Layout>
    )
}

export default Post

export async function getStaticProps({ params }: any) {
    const allPosts = getAllFrontMatterByType('posts')
    
    const pageSize = PAGE_SIZE;
    const pageNumber = 1;
    const total = allPosts.length;
    const start = (pageNumber - 1) * pageSize
    const posts = allPosts.slice(start, start + pageSize)

    return {
        props: {
            posts,
            pageSize,
            total,
            pageNumber
        }
    }
}
