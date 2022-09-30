import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import NavBar from '../../components/NavBars/AdminNavBar'
import Axios from '../../stores/Axios'
import { Context } from '../../stores/Context'
import axios from 'axios'

export default function ChangeStatus({ isLoggedIn }) {
  var router = useRouter()

  const { adminUser, setAdminUser } = useContext(Context)

  function getUser() {
    return new Promise((resolve, reject) => {
      Axios.get('/admin/getuser').then((res) => {
        resolve(res.data)
      })
    })
  }

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/admin/login')
    } else {
      getUser().then((res) => {
        setAdminUser(res)
      })
    }
  }, [])

  return (
    <div>
      <NavBar user={adminUser} />
      <div className='container'>
        <h1>Change Status</h1>
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
