import axios from 'axios'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBars/UserNavBar'
import Axios from '../stores/Axios'
import { Context } from '../stores/Context'

function Product({ product, quantity }) {
  return (
    <div className={`bg-white rounded-lg ${styles.product}`}>
      <Image
        src={`http://localhost:9000/api/public/getproductimage?id=${product._id}`}
        alt='GFG logo served with static path of public directory'
        height='200'
        width='200'
      />
      <h5>{product.name}</h5>
      <p>{product.type}</p>
      <p>{product.description}</p>
      <p>
        Price: <b>{product.price}&nbsp;₹</b>
      </p>
      <p>Quantity :{quantity}</p>
    </div>
  )
}

export default function OrderProducts({ isLoggedIn }) {
  var router = useRouter()

  const { orderId } = router.query

  const { user, setUser } = useContext(Context)
  const [orderProducts, setOrderProducts] = useState([])

  function getUser() {
    return new Promise((resolve) => {
      Axios.get('/user/getuser').then((res) => {
        resolve(res?.data)
      })
    })
  }

  function getOrderProducts() {
    return new Promise((resolve) => {
      Axios.get(`/user/getorderproducts?orderId=${orderId}`).then((res) => {
        resolve(res.data)
      })
    })
  }

  useEffect(() => {
    if (!isLoggedIn) router.push('/login')
    else {
      Promise.all([getUser(), getOrderProducts()]).then((res) => {
        setUser(res[0])
        setOrderProducts(res[1])
      })
    }
  }, [])

  return (
    <div>
      <NavBar user={user} page='order-products' />
      <div className='container'>
        <div className={`col-12 text-black {styles.products}`}>
          {orderProducts
            ? orderProducts.map((item, index) => {
                return (
                  <Product
                    key={index}
                    product={item.product}
                    quantity={item.quantity}
                  />
                )
              })
            : ''}
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
