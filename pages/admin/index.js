import axios from 'axios'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import NavBar from '../../components/NavBars/AdminNavBar'
import Axios from '../../stores/Axios'
import { Context } from '../../stores/Context'

export default function Admin({ isLoggedIn }) {
  const router = useRouter()
  const { setAdminUser, adminUser } = useContext(Context)

  useEffect(() => {
    function getUser() {
      return new Promise((resolve, reject) => {
        Axios.get('/admin/getuser').then((res) => {
          resolve(res.data)
        })
      })
    }
    if (isLoggedIn) {
      getUser().then((response) => {
        setAdminUser(response)
      })
    } else {
      router.push('/admin/login')
    }
  }, [])

  return (
    <div>
      <NavBar user={adminUser} userType='admin'></NavBar>
      <div>
        <h1>Admin page</h1>
      </div>
    </div>
  )
}
export async function getServerSideProps({ req }) {
  var cookie = req.headers.cookie ?? ''
  var response = await axios.get('http://localhost:9000/api/admin/checklogin', {
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
