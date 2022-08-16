import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NavBar from '../../components/NavBar'

export default function Admin({ isLoggedIn }) {
  var router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/admin/login')
    }
  })

  return (
    <div>
      <NavBar></NavBar>
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
  console.log(isLoggedIn)
  return {
    props: {
      isLoggedIn,
    },
  }
}
