import Link from 'next/link'
import NavBar from '../components/NavBar'
import Axios from '../stores/Axios'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SignUp() {
  const router = useRouter()

  function signup() {
    if (password != confirmPassword) {
      alert("Password doesn't match!")
      return
    }

    const data = {
      email,
      name,
      password
    }

    Axios.post('/user/signup', data).then((res) => {
      if (res.data.status == true) {
        router.push('/login')
      }
    })
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className='dark'>
      <NavBar></NavBar>
      <div className=' col-12 min-h-screen flex flex-col '>
        <div className=' container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
          <div className=' col-md-4 bg-white px-6 py-8 rounded shadow-md text-black w-full'>
            <h1 className='mb-8 text-3xl text-center'>Sign up</h1>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='block border border-grey-light w-full p-3 rounded mb-4 text-white'
              name='fullname'
              placeholder='Full Name'
            />

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
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='block border border-grey-light w-full p-3 rounded mb-4 text-white'
              name='confirm_password'
              placeholder='Confirm Password'
            />

            <button
              type='submit'
              onClick={signup}
              className='w-full text-center py-3 rounded bg-green-700 text-white hover:bg-green-900 focus:outline-none my-1'
            >
              Create Account
            </button>

            <div className='text-center text-sm text-grey-dark mt-4'>
              By signing up, you agree to the
              <a
                className='no-underline border-b border-grey-dark text-grey-dark'
                href='#'
              >
                Terms of Service
              </a>{' '}
              and
              <a
                className='no-underline border-b border-grey-dark text-grey-dark'
                href='#'
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div className='text-grey-dark mt-6'>
            Already have an account? &nbsp;
            <Link
              className='no-underline border-b border-blue text-blue'
              href='../login/'
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
