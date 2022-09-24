import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBars/UserNavBar'
import Axios from '../stores/Axios'
import { Context } from '../stores/Context'

function Product({ item, isLoggedIn }) {
  const { setTotal, setCartProducts } = useContext(Context)
  const [quantity, setQuantity] = useState()

  useEffect(() => {
    setQuantity(item.quantity)
  }, [item.quantity])

  function getCartProducts() {
    return new Promise((resolve) => {
      Axios.get('/user/getcartproducts').then((res) => {
        resolve(res?.data?.products)
      })
    })
  }

  function getTotal() {
    return new Promise((resolve) => {
      Axios.get('/user/gettotal').then((res) => {
        resolve(res?.data.total)
      })
    })
  }

  function increaseQuantity() {
    if (isLoggedIn) {
      const data = {
        count: 1,
        productId: item.product._id,
      }
      Axios.put('/user/addtocart', data).then(() => {
        setQuantity((quantity) => quantity + 1)
        setTotal((total) => total + item.product.price)
      })
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      if (isLoggedIn) {
        const data = {
          count: -1,
          productId: item.product._id,
        }
        Axios.put('/user/addtocart', data).then(() => {
          setQuantity((quantity) => quantity - 1)
          setTotal((total) => total - item.product.price)
        })
      }
    } else {
      alert(
        "Quantity can't be lower than 1, Use remove button to remove product from cart"
      )
    }
  }

  function removeFromCart() {
    if (isLoggedIn) {
      Axios.delete(`/user/removefromcart?productId=${item.product._id}`).then(
        () => {
          getCartProducts().then((res) => {
            if (res) {
              setCartProducts(res)
              getTotal().then((res) => {
                setTotal(res)
              })
            } else {
              setCartProducts([])
              setTotal(0)
            }
          })
        }
      )
    }
  }

  return (
    <tr>
      <td>
        <Image
          height='50px'
          width='50px'
          src={`http://localhost:9000/api/public/getproductimage?id=${item.product._id}`}
          alt=''
        />
      </td>
      <td>{item.product.name}</td>
      <td>
        <button
          className='cart-items-counter  mr-3 btn btn-primary'
          onClick={decreaseQuantity}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className='cart-items-counter ml-3 btn btn-primary'
          onClick={increaseQuantity}
        >
          +
        </button>
      </td>
      <td>₹{item.product.price}</td>
      <td>
        <button onClick={removeFromCart} className='btn btn-danger'>
          Remove
        </button>
      </td>
    </tr>
  )
}

export default function Cart({ isLoggedIn }) {
  const { setUser, user, cartProducts, setCartProducts, total, setTotal } =
    useContext(Context)

  var router = useRouter()

  function getUser() {
    return new Promise((resolve) => {
      Axios.get('/user/getuser').then((res) => {
        resolve(res?.data)
      })
    })
  }

  function getCartProducts() {
    return new Promise((resolve) => {
      Axios.get('/user/getcartproducts').then((res) => {
        resolve(res?.data?.products)
      })
    })
  }

  function getTotal() {
    return new Promise((resolve) => {
      Axios.get('/user/gettotal').then((res) => {
        resolve(res?.data.total)
      })
    })
  }

  function placeOrder() {
    router.push('/place-order')
  }

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([getUser(), getTotal(), getCartProducts()]).then((res) => {
        setUser(res[0])
        setTotal(res[1])
        if (res[2]) {
          setCartProducts(res[2])
        } else {
          setCartProducts([])
        }
      })
    }
  }, [])

  return (
    <div>
      <NavBar user={user} page='cart' />
      <div className='container'>
        <table className='table text-white' style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th scope='col'>Product</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quauntity</th>
              <th scope='col'>Price</th>
              <th scope='col'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((item, index) => {
              return <Product item={item} isLoggedIn={isLoggedIn} key={index} />
            })}
          </tbody>
        </table>
        <div className='inline-block'>
          <h2>Total Amount is: ₹&nbsp;{total}</h2>
          <button onClick={placeOrder} className='btn btn-success'>
            Place Order
          </button>
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
