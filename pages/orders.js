import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import NavBar from '../components/NavBars/UserNavBar'
import Axios from '../stores/Axios'
import { Context } from '../stores/Context'

export default function Orders({ isLoggedIn }) {
  function Order({ order }) {
    return (
      <tr>
        <td>{order.date}</td>
        <td>{order.total}</td>
        <td>{order.deliveryDetails.address}</td>
        <td>{order.deliveryDetails.mobile}</td>
        <td>{order.paymentMethod}</td>
        <td>{order.status}</td>
        <td>
          <Link href={`/order-products?orderId=${order._id}`}>
            <button className='btn btn-primary'>View Products</button>
          </Link>
        </td>
      </tr>
    )
  }

  const router = useRouter()

  const { user, setUser, orders, setOrders } = useContext(Context)

  function getUser() {
    return new Promise((resolve) => {
      Axios.get('/user/getuser').then((res) => {
        resolve(res?.data)
      })
    })
  }

  function getOrders() {
    return new Promise((resolve) => {
      Axios.get('/user/getorders').then((res) => {
        if (!res.data) res.data = []
        resolve(res.data)
      })
    })
  }

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([getUser(), getOrders()]).then((res) => {
        setUser(res[0])
        setOrders(res[1])
      })
    } else {
      router.push('/login')
    }
  }, [])

  return (
    <div>
      <NavBar user={user} userType='normal' />
      <div className='container'>
        <h1 className='mt-6 '>Orders</h1>
        <table className='table text-white' style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th scope='col'>Date</th>
              <th scope='col'>Price</th>
              <th scope='col'>Address</th>
              <th scope='col'>Phone</th>
              <th scope='col'>Payment</th>
              <th scope='col'>Status</th>
              <th scope='col'>Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return <Order key={index} order={order} />
            })}
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
