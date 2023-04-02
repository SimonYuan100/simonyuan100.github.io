
import Head from 'next/head'

import Layout from '../../components/layout'
import { getAllSeries, getAllTags } from '../../lib/posts'
import BackToTop from '../../components/back-to-top'
import PostList from '../../components/post-list'
import Banner from '../../components/banner'
import { upperCaseFirst } from 'upper-case-first'

const Page = ({ series }: any) => {

    return (
        <Layout>
            <Head>
                <title>{upperCaseFirst(series.title)}</title>
            </Head>

            <Banner title={upperCaseFirst(series.title)} abstract={series.description} tag={`${series.count} 篇`} />

            <main className='mx-5 md:mx-20 '>
                <PostList posts={series.articles} />
            </main>

            <BackToTop />

        </Layout>
    )
}

export default Page

export async function getStaticProps({ params }: any) {

    const allSeries = getAllSeries()
    
    const series = allSeries.find(series => {
        return series.name === params.series.toLowerCase()
    })

    return {
        props: {
            series
        }
    }
}

export async function getStaticPaths() {
    const allSeries = getAllSeries()
    const paths = allSeries.map(series => {
        return {
            params: {
                series: series.name
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}
