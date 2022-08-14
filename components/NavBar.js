import Link from 'next/link'

export default function NavBar({ isLoggedIn }) {
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
            <a className='nav-link' href='#'>
              Home{' '}
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              Link
            </a>
          </li>
        </ul>
        <div>
          {!isLoggedIn ? (
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
              <button className='btn btn-success'>LogOut</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
