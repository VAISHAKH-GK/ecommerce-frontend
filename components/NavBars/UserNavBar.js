import Link from 'next/link'
import { useContext, useState } from 'react'
import Axios from '../../stores/Axios'
import { Context } from '../../stores/Context'
import styles from '../../styles/UserNavBar.module.css'

export default function NavBar({ user, page }) {
  const { setUser, setProducts } = useContext(Context)

  const [search, setSearch] = useState()

  function logout() {
    Axios.get('/user/logout').then((res) => {
      if (res.data.status) {
        setUser(null)
      }
    })
  }

  function getProducts() {
    return new Promise((resolve) => {
      Axios.get('/public/getproducts?number=5').then((res) => {
        resolve(res.data)
      })
    })
  }

  function searchProduct(e) {
    e.preventDefault()
    if (search != '') {
      Axios.get(`/public/searchproduct?search=${search}`).then(({ data }) => {
        console.log(data)
        setProducts(data)
      })
    } else {
      getProducts().then((res) => {
        setProducts(res)
      })
    }
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
            <Link href='/'>
              <p className='nav-link cursor-pointer'>Home</p>
            </Link>
          </li>
          <li className='nav-item'>
            <Link href='/cart'>
              <p className='nav-link cursor-pointer'>Cart</p>
            </Link>
          </li>
          <li className='nav-item'>
            <Link href='/orders'>
              <p className='nav-link cursor-pointer'>Orders</p>
            </Link>
          </li>
        </ul>
        {page == 'index' ? (
          <form className={styles.searchForm}>
            <input
              className={styles.searchArea}
              type='search'
              placeholder='Search'
              aria-label='Search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className={`btn btn-primary ${styles.searchButton}`}
              type='submit'
              onClick={searchProduct}
            >
              Search
            </button>
          </form>
        ) : (
          ''
        )}
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
    </nav>
  )
}
