import axios from 'axios'
import styles from '../styles/Home.module.css'
import { getURL } from 'next/dist/shared/lib/utils'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBars/UserNavBar'
import Axios from '../stores/Axios'
import { Context } from '../stores/Context'

function Product({ type, name, description, price, id }) {
  return (
    <div className={`bg-white rounded-lg ${styles.product}`}>
      <Image
        src={`http://localhost:9000/api/public/getproductimage?id=${id}`}
        alt='GFG logo served with static path of public directory'
        height='200'
        width='200'
      />
      <h5>{name}</h5>
      <p>{type}</p>
      <p>{description}</p>
      <p>
        Price: <b>{price}&nbsp;₹</b>
      </p>
    </div>
  )
}
export default function Cart({ isLoggedIn }) {
  const { setUser, user } = useContext(Context)
  const [cartProducts, setCartProducts] = useState()

  function getUser() {
    return new Promise((resolve, reject) => {
      Axios.get('/user/getuser').then((res) => {
        resolve(res?.data)
      })
    })
  }

  function getCartProducts() {
    return new Promise((resolve, reject) => {
      Axios.get('/user/getcartproducts').then((res) => {
        resolve(res?.data?.products)
      })
    })
  }

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([getUser(), getCartProducts()]).then((res) => {
        setUser(res[0])
        setCartProducts(res[1])
      })
    }
  }, [])

  return (
    <div className={`text-black`} >
      <NavBar user={user} userType='normal' />
      <div className='container'>
        <h1>Cart</h1>
        {cartProducts
          ? cartProducts.map((product, index) => {
              return (
                <Product
                  key={index}
                  name={product.name}
                  type={product.type}
                  description={product.description}
                  price={product.price}
                  id={product._id}
                />
              )
            })
          : ''}
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
