import Axios from '../stores/Axios'
import Link from 'next/link'
import { useState } from 'react'
import NavBar from '../components/NavBar'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()

  function login() {
    const data = {
      email,
      password,
    }

    Axios.post('/user/login', data).then((res) => {
      if (res.data.status == true) {
        router.push('/')
      } else {
        alert(res.data.reason)
      }
    })
  }

  const [email, setEmail] = useState('')
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='block border border-grey-light w-full p-3 rounded mb-4 text-white'
              name='email'
              placeholder='Email'
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
              onClick={login}
              className='w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-900 focus:outline-none my-1'
            >
              Login
            </button>
          </div>
          <div className='text-grey-dark mt-6'>
            Dont have an account? &nbsp;
            <Link
              className='no-underline border-b border-blue text-blue'
              href='../signup/'
            >
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
