import Head from 'next/head'
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children, home }: {
  children: React.ReactNode,
  home?: boolean
}) {
  return (
    <>
      <Navbar></Navbar>
      <main className="mx-auto container">{children}</main>
      <Footer></Footer>
    </>
    
  )
}
