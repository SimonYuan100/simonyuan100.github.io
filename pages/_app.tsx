import '../styles/global.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

/**
 * 
 * @param param0 
 * @returns 
 */
function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
    </Head>
    <ThemeProvider attribute='class' enableSystem={true}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
}

export default App
