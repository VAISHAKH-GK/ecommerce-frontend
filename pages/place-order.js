import axios from 'axios'
import NavBar from '../components/NavBars/UserNavBar'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { Context } from '../stores/Context'
import Axios from '../stores/Axios'

export default function PlaceOrder({ isLoggedIn }) {
  const { user, setUser } = useContext(Context)
  var router = useRouter()

  function getUser() {
    return new Promise((resolve) => {
      Axios.get('/user/getuser').then((res) => {
        resolve(res?.data)
      })
    })
  }

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login')
    } else {
      getUser().then((res) => {
        setUser(res)
      })
    }
  }, [])

  return (
    <div>
      <NavBar user={user} userType='normal' />
      <div className='container'>
        <section className=' col-md-12' style={{ 'margin-top': '20vh' }}>
          <form action='' id='payment' method='post'>
            <div className='row'>
              <div className='  col-md-5'>
                <div className='mb-3'>
                  <h1 className='mx-auto' style={{ width: '370px' }}>
                    Order Details
                  </h1>
                </div>
                <div className='mb-3'>
                  <label htmlFor='Name' className='form-label'>
                    Name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='Name'
                    placeholder='Enter your name'
                    name='Name'
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='Address' className='form-label'>
                    Address
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='Address'
                    placeholder='Shippment Address'
                    name='Address'
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='Email' className='form-label'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    className='form-control'
                    id='Email'
                    placeholder='Email Address'
                    name='Email'
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='Mobile' className='form-label'>
                    Mobile
                  </label>
                  <input
                    type='tel'
                    className='form-control'
                    id='Mobile'
                    placeholder='Mobile Number'
                    name='Mobile'
                  />
                  <input
                    type='text'
                    name='userId'
                    id=''
                    value='{{user._id}}'
                    hidden
                  />
                </div>
              </div>
              <div className='col-md-5 ml-auto'>
                <div
                  className='solid '
                  style={{
                    ' border': '2px solid',
                    'border-radius': '10px',
                    'border-color': 'grey',
                    padding: '20px',
                    height: '260px',
                  }}
                >
                  <div>
                    <h3 className='font-weight-bold'>Total Amount : ₹100</h3>
                  </div>
                  <hr />
                  <div>
                    <h5
                      style={{
                        'padding-bottom': '10px',
                        'padding-top': '10px',
                      }}
                    >
                      Payment method
                    </h5>
                    <input
                      type='radio'
                      id='COD'
                      name='pay_method'
                      value='COD'
                    />
                    <label htmlFor='COD'>COD</label>
                    <br />
                    <input
                      type='radio'
                      id='Online'
                      name='pay_method'
                      value='ONLINE'
                    />
                    <label htmlFor='Online'>Online</label>
                    <br />
                    <button
                      className='float-right btn btn-primary'
                      type='submit'
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
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
