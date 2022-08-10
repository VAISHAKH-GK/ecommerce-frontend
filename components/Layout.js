import Head from "next/head"
import 'bootstrap/dist/css/bootstrap.css'
import ContextProvider from '../stores/Context.js'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ContextProvider>
        {children}
      </ContextProvider>
    </>
  )
}
