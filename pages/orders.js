import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import NavBar from '../components/NavBars/UserNavBar'
import Axios from '../stores/Axios'
import { Context } from '../stores/Context'

export default function Orders({ isLoggedIn }) {
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
    return new Promise((resolve, reject) => {
      Axios.get('/user/getorders').then((res) => {
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

  useEffect(() => {
    console.log('orders')
    console.log(orders)
  }, [orders])

  return (
    <div>
      <NavBar user={user} userType='normal'></NavBar>
      <div className='container'>
        <div>
          <h1>HAI</h1>
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
