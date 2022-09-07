import axios from 'axios'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBars/UserNavBar'
import Axios from '../stores/Axios'
import { Context } from '../stores/Context'

function Product({ item }) {
  const [quantity, setQuantity] = useState(item.quantity)
  function increaseQuantity() {
    var newQuantity = quantity + 1
    Axios.patch(
      `/user/addtocart?productId=${item.product._id}&&count=${newQuantity}`
    ).then(() => {
      setQuantity(newQuantity)
    })
  }
  function decreaseQuantity() {
    if (quantity > 1) {
      var newQuantity = quantity - 1
      Axios.patch(
        `/user/addtocart?productId=${item.product._id}&&count=${newQuantity}`
      ).then(() => {
        setQuantity(newQuantity)
      })
    } else {
      alert('Quantity can\'t be lower than 1')
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
        <a href='' className='btn btn-danger'>
          Remove
        </a>
      </td>
    </tr>
  )
}
export default function Cart({ isLoggedIn }) {
  const { setUser, user, cartProducts, setCartProducts } = useContext(Context)

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
        console.log(res[1])
        setCartProducts(res[1])
      })
    }
  }, [])

  return (
    <div>
      <NavBar user={user} userType='normal' />
      <div className='container'>
        <table className='table text-white ' style={{ 'margin-top': '20px' }}>
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
            {cartProducts
              ? cartProducts.map((item, index) => {
                  return <Product item={item} key={index} />
                })
              : ''}
          </tbody>
        </table>
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
