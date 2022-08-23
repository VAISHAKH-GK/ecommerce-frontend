import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import NavBar from '../../components/NavBars/AdminNavBar'
import Axios from '../../stores/Axios'
import { Context } from '../../stores/Context'
import axios from 'axios'
import Image from 'next/image'

export default function AddProduct({ isLoggedIn }) {
  var router = useRouter()

  const { setAdminUser, adminUser } = useContext(Context)

  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)

  const [image, setImage] = useState()
  const [imageURL, setImageURL] = useState()

  useEffect(() => {
    function getUser() {
      return new Promise((resolve, reject) => {
        Axios.get('/admin/getuser').then((res) => {
          resolve(res.data)
        })
      })
    }
    if (isLoggedIn && !adminUser) {
      getUser().then((response) => {
        setAdminUser(response)
      })
    } else if (!isLoggedIn) {
      setAdminUser(null)
      router.push('/admin/login')
    }
  }, [])

  function imageHandler(e) {
    var uploadedImage = e?.target?.files[0]
    if (uploadedImage) {
      setImage(uploadedImage)
      setImageURL(URL.createObjectURL(uploadedImage))
    }
  }

  function addProduct(e) {
    e.preventDefault()
    if (!window.confirm('Add this Product ? ')) return
    const data = {
      name,
      type,
      description,
      price,
    }
    console.log(data)
    Axios.post('/admin/addproduct', data).then((response) => {
      if (response.data.status) {
        window.confirm('Product added ')
      }
    })
  }

  return (
    <div>
      <NavBar user={adminUser} />
      <div>
        <div className='container'>
          <form className='col-md-6 ml-auto mr-auto mt-28 '>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                className='form-control mb-3 mt-1'
                id='Name'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Product Name'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='type'>Type</label>
              <input
                type='text'
                className='form-control mb-3 mt-1'
                id='Type'
                name='type'
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder='Product Type'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <input
                type='text'
                className='form-control mb-3 mt-1'
                id='Description'
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Product Description'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='price'>Price</label>
              <input
                type='number'
                className='form-control mb-3 mt-1'
                id='Price'
                name='price'
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                placeholder='Price in rupee'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='image'>Image</label>
              <input
                type='file'
                className='form-control mt-1 mb-3'
                id='Image'
                accept='image/*'
                name='image'
                onChange={imageHandler}
              />
            </div>
            <div>{imageURL ? <Image src={imageURL} className='mt-1' height={100} width={200} alt='no'></Image> : ''}</div>
            <button
              type='submit'
              onClick={addProduct}
              className='btn btn-primary mt-7'
              id='sub-btn'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
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
