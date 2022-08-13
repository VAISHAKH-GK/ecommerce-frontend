import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar.js'
import { useContext, useEffect } from 'react'
import { Context } from '../stores/Context'
import { useRouter } from 'next/router'
import Axios from '../stores/Axios'

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

export default function Home() {
  const router = useRouter()

  const { user, setUser } = useContext(Context)

  useEffect(() => {
    function isLoggedIn() {
      return new Promise((resolve, reject) => {
        Axios.get('/user/checklogin').then((res) => {
          resolve(res.data.status)
        })
      })
    }
    function getUser() {
      return new Promise((resolve, reject) => {
        Axios.get('/user/getuser').then((res) => {
          resolve(res.data)
        })
      })
    }
    Promise.all([isLoggedIn(), getUser()]).then((res) => {
      if (!res[0]) {
        router.push('/login')
      } else {
        setUser(res[1])
      }
    })
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
