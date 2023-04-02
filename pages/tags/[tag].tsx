import Head from 'next/head'

import Layout from '../../components/layout'
import { getAllTags } from '../../lib/posts'
import BackToTop  from '../../components/back-to-top'
import PostList from '../../components/post-list'
import Banner from '../../components/banner'
import {upperCaseFirst} from 'upper-case-first'

const Page = ({ posts, total, tag }: any) => {

    return (
        <Layout>
            <Head>
                <title>{upperCaseFirst(tag)}</title>
            </Head>

            <Banner title={upperCaseFirst(tag)} abstract='不积跬步，无以致千里；不积小流，无以成江海。' tag={`${total} 个`} />

            <main className='mx-5 md:mx-20 '>
                <PostList posts={posts} />
            </main>

            <BackToTop />

        </Layout>
    )
}

export default Page

export async function getStaticProps({ params }: any) {

    const allTags = getAllTags()
    const posts = allTags.find(tag => {
        return tag.name.toLowerCase() === params.tag.toLowerCase()
    }).posts

    return {
        props: {
            tag: params.tag,
            total: posts.length,
            posts: posts.slice(0, 20)
        }
    }
}

export async function getStaticPaths() {
    const allTags = getAllTags()
    const paths = allTags.map(tag => {
        return {
            params: {
                tag: tag.name
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}
