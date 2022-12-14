import axios from 'axios'
import NavBar from '../components/NavBars/UserNavBar'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../stores/Context'
import Axios from '../stores/Axios'

export default function PlaceOrder({ isLoggedIn }) {
  const { user, setUser } = useContext(Context)

  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState(0)
  const [total, setTotal] = useState(0)

  var router = useRouter()

  function getUser() {
    return new Promise((resolve) => {
      Axios.get('/user/getuser').then((res) => {
        resolve(res?.data)
      })
    })
  }

  function getTotal() {
    return new Promise((resolve) => {
      Axios.get('/user/gettotal').then((res) => {
        resolve(res?.data.total)
      })
    })
  }

  function verifyOnlinePayment(payment, orderId) {
    Axios.post('/user/verifypayment', { payment, orderId }).then(({ data }) => {
      if (data.status) {
        alert('Payment successful')
        router.push('/orders')
      } else {
        alert('Payment Failed')
        router.push('/')
      }
    })
  }

  function razorpay(order, key) {
    var options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: (response) => {
        verifyOnlinePayment(response, order.receipt)
      },
      prefill: {
        name: name,
        email: email,
        contact: number,
      },
    }
    var rzp = new Razorpay(options)
    rzp.on('payment.failed', () => {
      alert('Payment Faild')
      router.push('/')
    })
    rzp.open()
  }

  function checkOut(e) {
    const date = new Date()
    const now = date.toString()

    const data = {
      name,
      address,
      email,
      number,
      paymentMethod,
      date: now,
    }
    e.preventDefault()
    if (confirm('Confirm Order ?')) {
      Axios.post('/user/placeorder', data).then(({ data }) => {
        if (data.status === 'DONE') {
          alert('Orer Placed')
          router.push('/orders')
        } else if (data.status === 'PENDING') {
          razorpay(data.orderData, data.key)
        }
      })
    }
  }

  function changePayMethod(e) {
    setPaymentMethod(e.target.value)
  }

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login')
    } else {
      /* getUser().then((res) => { */
      /*   setUser(res) */
      /* }) */
      Promise.all([getUser(), getTotal()]).then((res) => {
        setUser(res[0])
        setTotal(res[1])
      })
    }
  }, [])

  return (
    <div>
      <NavBar user={user} page='place-order' />
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
                    <h3 className='font-weight-bold'>Total Amount : {total}</h3>
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
                      checked={paymentMethod === 'COD'}
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
                      checked={paymentMethod === 'ONLINE'}
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
