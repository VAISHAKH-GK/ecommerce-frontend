import axios from 'axios'
import { getURL } from 'next/dist/shared/lib/utils'
import { useContext, useEffect } from 'react'
import NavBar from '../components/NavBars/UserNavBar'
import Axios from '../stores/Axios'
import { Context } from '../stores/Context'

export default function Cart({ isLoggedIn }) {
  const { setUser, user } = useContext(Context)

  function getUser() {
    return new Promise((resolve, reject) => {
      Axios.get('/user/getuser').then((res) => {
        resolve(res.data)
      })
    })
  }

  useEffect(() => {
    getUser().then((res) => {
      setUser(res)
    })
  })

  return (
    <div>
      <NavBar user={user} userType='normal' />
      <div className='container'>
        <h1>Cart</h1>
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
