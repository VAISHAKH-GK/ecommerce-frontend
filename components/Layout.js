import Head from "next/head"
import 'bootstrap/dist/css/bootstrap.css'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </>
  )
}
