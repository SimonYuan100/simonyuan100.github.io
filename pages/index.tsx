import Layout from '../components/layout'
import { getAllFrontMatterByType } from '../lib/posts'
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
    <Layout>
      <Banner title='上善若水' abstract='水善利万物而不争，处众人之所恶，故几于道。' />
      <main className='mx-5 md:mx-20'>
        <PostList posts={allPostsData} />
      </main>
      <BackToTop/>
      
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = () => {
  const allPostsData = getAllFrontMatterByType('all')
  return {
    props: {
      allPostsData,
    },
  }
}
