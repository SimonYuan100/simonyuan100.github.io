import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import { GetStaticProps } from 'next';
import BackToTop from '../components/back-to-top'
import Banner from '../components/banner'
import PostList  from '../components/post-list'
interface postData {
  date: string,
  id: string,
  title: string,
  author: string
}

export default function Home({ allPostsData }: {
  allPostsData: postData[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Banner title='上善若水' abstract='水善利万物而不争，处众人之所恶，故几于道。' />
      <main className='mx-5 md:mx-20'>
        <PostList posts={allPostsData} />
      </main>
      <BackToTop/>
      
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}
