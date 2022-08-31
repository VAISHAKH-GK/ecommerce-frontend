import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import NavBar from '../../components/NavBars/AdminNavBar'
import { Context } from '../../stores/Context'
import axios from 'axios'
import Axios from '../../stores/Axios'

export default function Products({ isLoggedIn }) {
  const router = useRouter()
  const { setAdminUser, adminUser, adminProducts, setAdminProducts } =
    useContext(Context)

  useEffect(() => {
    function getUser() {
      return new Promise((resolve, reject) => {
        Axios.get('/admin/getuser').then((res) => {
          resolve(res.data)
        })
      })
    }
    function getProducts() {
      return new Promise((resolve, reject) => {
        Axios.get('/public/getproducts?number=5').then((res) => {
          resolve(res.data)
        })
      })
    }
    if (isLoggedIn && !adminUser) {
      Promise.all([getUser(), getProducts()]).then((res) => {
        setAdminUser(res[0])
        setAdminProducts(res[1])
      })
    } else if (!isLoggedIn) {
      setAdminUser(null)
      router.push('/admin/login')
    } else {
      getProducts().then((res) => {
        setAdminProducts(res)
      })
    }
  }, [])

  return (
    <div>
      <NavBar user={adminUser}></NavBar>
      <main className='main text-white' style={{ paddingTop: '40px' }}>
        <section>
          <div className='container'>
            <div className='row col-md-12'>
              <Link href='/admin/add-product'>
                <button className='btn btn-success ml-auto col-md-2'>
                  Add Product
                </button>
              </Link>
            </div>

            <table
              className='table'
              style={{ marginTop: '20px ', color: 'white' }}
              id='productsTable'
            >
              <thead>
                <tr>
                  <th scope='col'>Prodect-Name</th>
                  <th scope='col'>Type</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Image</th>
                  <th scope='col'>Edit</th>
                </tr>
              </thead>

              <tbody>
                {adminProducts.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.type}</td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td>
                        <Image
                          src={`http://localhost:9000/api/public/getproductimage?id=${product._id}`}
                          alt='GFG logo served with static path of public directory'
                          height='80'
                          width='80'
                          key={index}
                        />
                      </td>
                      <td>
                        <Link href={`/admin/edit-product?id=${product._id}`}>
                          <button className='btn btn-primary'> Edit</button>
                        </Link>
                        <button className='btn btn-danger ml-2'>Delete</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
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
  return {
    props: {
      isLoggedIn,
    },
  }
}
