import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import Axios from '../../stores/Axios'
import { Context } from '../../stores/Context'

export default function NavBar({ user }) {
  const router = useRouter()
  const { setAdminUser } = useContext(Context)

  function logout() {
    Axios.get('/admin/logout').then((res) => {
      if (res.data.status) {
        setAdminUser(null)
        router.push('/admin/login')
      }
    })
  }
  return (
    <nav className='navbar-expand-lg ps-5 pe-5 navbar navbar-dark bg-dark'>
      <Link href='/'>
        <a className='navbar-brand'>Ecommerce</a>
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav me-auto'>
          <li className='nav-item active'>
            <Link href='/admin'>
              <p className='nav-link cursor-pointer'>Home</p>
            </Link>
          </li>
          <li className='nav-item'>
            <Link href='/admin/products'>
              <p className='nav-link cursor-pointer'>Products</p>
            </Link>
          </li>
          <li className='nav-item'>
            <Link href='/admin/orders'>
              <p className='nav-link cursor-pointer'>Orders</p>
            </Link>
          </li>
        </ul>
        <div>
          {!user ? (
            <div>
              <Link href='/signup'>
                <button className='btn btn-success'>SignUp</button>
              </Link>
              <Link href='/login'>
                <button className='btn btn-success ml-2 '>Login</button>
              </Link>
            </div>
          ) : (
            <div>
              <button className='btn btn-success' onClick={logout}>
                LogOut
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
