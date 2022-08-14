import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar.js'
import { useContext, useEffect } from 'react'
import { Context } from '../stores/Context'
import Axios from '../stores/Axios'
import axios from 'axios'

function Product({ item, description, price }) {
  return (
    <div className={`col-3 ${styles.product}`}>
      <Image
        src='/image.png'
        alt='GFG logo served with static path of public directory'
        height='350'
        width='200'
      />
      <h1>{item}</h1>
      <p>{description}</p>
      <h3>{price}</h3>
    </div>
  )
}

export default function Home({ isLoggedIn }) {
  const { setUser } = useContext(Context)

  useEffect(() => {
    function getUser() {
      return new Promise((resolve, reject) => {
        Axios.get('/user/getuser').then((res) => {
          resolve(res.data)
        })
      })
    }
    if (isLoggedIn) {
      getUser().then((response) => {
        setUser(response)
      })
    }
  }, [])

  return (
    <div>
      <NavBar />
      <div className={`${styles.main}`}>
        <div className='container'>
          <div className={`col-12 ${styles.products}`}>
            <Product item='phone' description='good phone' price='10000' />
            <Product item='phone' description='good phone' price='10000' />
            <Product item='phone' description='good phone' price='10000' />
            <Product item='phone' description='good phone' price='10000' />
            <Product item='phone' description='good phone' price='10000' />
            <Product item='phone' description='good phone' price='10000' />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  var cookie = req.cookies
  var response = await axios.get('http://localhost:9000/api/user/checklogin', {
    headers: { Cookie: cookie },
    withCredentials: true,
  })
  var isLoggedIn = response.data.status
  return {
    props: {
      isLoggedIn,
    },
  }
}
