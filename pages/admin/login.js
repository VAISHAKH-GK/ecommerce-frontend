import { useRouter } from 'next/router'
import { useState } from 'react'
import NavBar from '../../components/NavBar'
import  Axios  from '../../stores/Axios'

export default function Login() {
  const router = useRouter()

  function login() {
    const data = {
      userName,
      password,
    }

    Axios.post('/admin/login', data).then((res) => {
      if (res.data.status == true) {
        console.log(res.data)
        router.push('/admin')
      } else {
        alert(res.data.reason)
      }
    })
  }

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <NavBar></NavBar>
      <div className='bg-grey-lighter min-h-screen flex flex-col col-12 '>
        <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
          <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full col-md-4 '>
            <h1 className='mb-8 text-3xl text-center'>Login</h1>

            <input
              type='text'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className='block border border-grey-light w-full p-3 rounded mb-4 text-white'
              name='userName'
              placeholder='Username'
            />

            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='block border border-grey-light w-full p-3 rounded mb-4 text-white'
              name='password'
              placeholder='Password'
            />

            <button
              type='submit'
              className='w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-900 focus:outline-none my-1'
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
