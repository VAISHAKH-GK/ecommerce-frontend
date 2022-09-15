import axios from 'axios'
import NavBar from '../components/NavBars/UserNavBar'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../stores/Context'
import Axios from '../stores/Axios'

export default function PlaceOrder({ isLoggedIn }) {
  const { user, setUser } = useContext(Context)

  const [payMethod, setPayMethod] = useState('COD')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState(0)

  var router = useRouter()

  function getUser() {
    return new Promise((resolve) => {
      Axios.get('/user/getuser').then((res) => {
        resolve(res?.data)
      })
    })
  }

  function checkOut(e) {
    const date = new Date()
    const now = date.toString()

    const data = {
      name,
      address,
      email,
      number,
      payMethod,
      date: now,
    }
    e.preventDefault()
    if (confirm('Confirm Order ?')) {
      Axios.post('/user/placeorder', data).then((res) => {
        if (res.data.status) {
          alert('Orer Placed')
          router.push('/orders')
        }
      })
    }
  }

  function changePayMethod(e) {
    setPayMethod(e.target.value)
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
        <section className=' col-md-12' style={{ marginTop: '20vh' }}>
          <form id='payment' method='post'>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className='col-md-5 ml-auto'>
                <div
                  className='solid '
                  style={{
                    ' border': '2px solid',
                    borderRadius: '10px',
                    borderColor: 'grey',
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
                        paddingBottom: '10px',
                        paddingTop: '10px',
                      }}
                    >
                      Payment method
                    </h5>
                    <input
                      type='radio'
                      id='COD'
                      value='COD'
                      default
                      name='pay_method'
                      onChange={changePayMethod}
                      checked={payMethod === 'COD'}
                    />
                    <label htmlFor='COD'>COD</label>
                    <br />
                    <input
                      type='radio'
                      id='Online'
                      name='pay_method'
                      value='ONLINE'
                      readOnly
                      onChange={changePayMethod}
                      checked={payMethod === 'ONLINE'}
                    />
                    <label htmlFor='Online'>Online</label>
                    <br />
                    <button
                      className='float-right btn btn-primary'
                      type='submit'
                      onClick={checkOut}
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
