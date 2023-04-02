
import Head from 'next/head'

import Layout from '../components/layout'
import { getAllTags } from '../lib/posts'
import BackToTop from '../components/back-to-top'
import Banner from '../components/banner'
import Link from 'next/dist/client/link'

const Tags = ({ tags, tagsByFirstLetter }: any) => {

    const listByLetter = tagsByFirstLetter.map((item: any) => {
        return <div key={item.title} className='pb-8 md:pb-16'>
            <h3 className='text-2xl md:text-4xl  text-blue-500'>{item.title}</h3>
            <div className='mt-2'>
                {item.tags.map((tag: any) => {
                    return <Link key={tag.name} href={{ pathname: `/tags/${tag.name}` }}>
                        <span className='block md:mt-3'>
                            {tag.title}
                            <span className='opacity-50 text-sm ml-2 align-top'>{tag.count}</span>
                        </span>
                    </Link>
                })}
            </div>
        </div>
    })

    return (
        <Layout>
            <Head>
                <title>Tags</title>
            </Head>

            <Banner title='标签' abstract={'且钓竿渔艇，笔床茶灶，闲听荷雨，一洗衣尘。'} tag={`${tags.length} 个`} />

            <main className='mx-5 md:mx-20 pb-20'>
                <div className='columns-2 md:columns-5 gap-2 md:gap-16 pt-12 '>
                    {listByLetter}
                </div>
            </main>
            <BackToTop />
        </Layout>
    )
}

export default Tags

export async function getStaticProps({ params }: Params) {
    const tags = getAllTags()
    const _tagsByFirstLetter: any = {}

    tags.forEach(item => {
        let fl = item.title.substring(0, 1)
        if (/[a-zA-Z0-9]/.test(fl) === false) {
            fl = 'Zh'
        }
        if (_tagsByFirstLetter[fl]) {
            _tagsByFirstLetter[fl].tags.push(item)
        } else {
            _tagsByFirstLetter[fl] = { title: fl, tags: [item] }
        }
    })

    const tagsByFirstLetter = Array.from(Object.keys(_tagsByFirstLetter), k => {
        return _tagsByFirstLetter[k]
    }).sort((a: any, b: any) => { return a.title > b.title ? 0 : -1 })

    return {
        props: {
            tags,
            tagsByFirstLetter
        }
    }
}
