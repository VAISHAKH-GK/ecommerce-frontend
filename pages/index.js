import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBars/UserNavBar'
import { useContext, useEffect } from 'react'
import { Context } from '../stores/Context'
import Axios from '../stores/Axios'
import axios from 'axios'

export default function Home({ isLoggedIn }) {
  const { setUser, user, products, setProducts } = useContext(Context)

  function Product({ type, name, description, price, id }) {
    const { cartProducts, setCartProducts } = useContext(Context)
    function addToCart() {
      if (isLoggedIn) {
        Axios.patch(`/user/addtocart?id=${id}`).then((res) => {
          if (res?.data?.status) {
            alert('Product Added to Cart')
          } else if (res?.data?.status == false) {
            alert(res.data.reason)
          }
        })
      } else {
        var product = {
          _id: id,
          name,
          type,
          description,
          price,
        }
        setCartProducts([...cartProducts, product])
      }
    }
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
        <button onClick={addToCart} className='btn btn-primary mt-1 mb-1'>
          Add To Cart
        </button>
      </div>
    )
  }

  function getUser() {
    return new Promise((resolve, reject) => {
      Axios.get('/user/getuser').then((res) => {
        resolve(res.data)
      })
    })
  }

  function getProducts() {
    return new Promise((resolve, reject) => {
      Axios.get('/public/getproducts?number=5').then((res) => {
        resolve(res.data)
      })
    })
  }

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([getUser(), getProducts()]).then((res) => {
        setUser(res[0])
        setProducts(res[1])
      })
    } else {
      getProducts().then((res) => {
        setProducts(res)
      })
    }
  }, [])

  return (
    <div>
      <NavBar user={user} userType='normal' />
      <div className={` ${styles.main}`}>
        <div className='container'>
          <div className={`col-12 text-black {styles.products}`}>
            {products
              ? products.map((product, index) => {
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
