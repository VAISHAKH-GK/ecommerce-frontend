import axios from 'axios'
import NavBar from '../components/NavBars/UserNavBar'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { Context } from '../stores/Context'
import Axios from '../stores/Axios'

export default function PlaceOrder({ isLoggedIn }) {
  const { user, setUser } = useContext(Context)
  var router = useRouter()

  function getUser() {
    return new Promise((resolve) => {
      Axios.get('/user/getuser').then((res) => {
        resolve(res?.data)
      })
    })
  }

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login')
    } else {
      getUser().then((res) => {
        setUser(res)
      })
    }
  }, [])

  return (
    <div>
      <NavBar user={user} userType='normal' />
      <div className='container'>
        <h1>Place Order Page</h1>
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
