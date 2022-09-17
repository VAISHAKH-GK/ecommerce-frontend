import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'
import ContextProvider from '../stores/Context.js'
import Script from 'next/script.js'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Script src='https://checkout.razorpay.com/v1/checkout.js' />
      <ContextProvider>{children}</ContextProvider>
    </>
  )
}
