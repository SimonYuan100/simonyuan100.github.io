import Head from 'next/head'
import Layout from '../components/layout'
import { getAllTags } from '../lib/posts'
import BackToTop from '../components/back-to-top'
import Banner from '../components/banner'

const Tags = () => {

    return (
        <Layout>
            <Head>
                <title>About</title>
            </Head>

            <Banner title='About' abstract='天行健，君子以自强不息。地势坤，君子以厚德载物。' />

            <div className="space-y-2 my-16 md:space-y-5 pr-10 py-20 md:py-52 text-center text-gray-500 font-thin">
                <p>enjoy life, enjoy coding</p>
            </div>
            
            <BackToTop />
        </Layout>
    )
}

export default Tags

export async function getStaticProps() {
    const tags = getAllTags()
    return {
        props: {
            tags
        }
    }
}
