import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBars/UserNavBar'
import { useContext, useEffect } from 'react'
import { Context } from '../stores/Context'
import Axios from '../stores/Axios'
import axios from 'axios'
import Link from 'next/link'

function Product({ type, name, description, price }) {
  return (
    <div className={`col-2 bg-white m-1 rounded-lg ${styles.product}`}>
      <Image
        src='/image.png'
        alt='GFG logo served with static path of public directory'
        height='250'
        width='150'
      />
      <h5>{name}</h5>
      <p>{type}</p>
      <p>{description}</p>
      <p>Price :<b>{price}&nbsp;₹</b></p>
      <Link href="" >
        <button className='btn btn-primary mt-1 mb-1' >Add To Cart</button>
      </Link>
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
      <div className={` ${styles.main}`}>
        <div className='container'>
          <div className={`col-12 {styles.products}`}>
            <Product
              name='IPhone 12'
              type='phone'
              description='good phone'
              price='10000'
            />
            <Product
              name='IPhone 12'
              type='phone'
              description='good phone'
              price='10000'
            />
            <Product
              name='IPhone 12'
              type='phone'
              description='good phone'
              price='10000'
            />
            <Product
              name='IPhone 12'
              type='phone'
              description='good phone'
              price='10000'
            />
            <Product
              name='IPhone 12'
              type='phone'
              description='good phone'
              price='10000'
            />
            <Product
              name='IPhone 12'
              type='phone'
              description='good phone'
              price='10000'
            />
            <Product
              name='IPhone 12'
              type='phone'
              description='good phone'
              price='10000'
            />
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
