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
        height='250'
        width='150'
      />
      <p>{item}</p>
      <p>{description}</p>
      <p>{price}</p>
    </div>
  )
}

export default function Home({ isLoggedIn }) {
  const { setUser, user } = useContext(Context)

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
      <NavBar user={user} userType='normal' />
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
  var cookie = req.headers.cookie ?? ''
  var response = await axios.get('http://localhost:9000/api/user/checklogin', {
    withCredentials: true,
    headers: { cookie: cookie },
  })
  var isLoggedIn = response.data.status
  return {
    props: {
      isLoggedIn,
    },
  }
}
