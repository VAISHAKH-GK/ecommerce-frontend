import Image from 'next/image'

export default function Products() {
  return (
    <div>
      <main className='main' style={{ 'padding-top': '40px' }}>
        <section>
          <div className='container'>
            <div
              className='row '
              style={{ display: 'flex', 'justify-content': 'right' }}
            >
              <a href='/admin/add-product' className='btn btn-success mb-3'>
                Add Product
              </a>
            </div>
            <table
              className='table'
              style={{ 'margin-top': '20px ' }}
              id='productsTable'
            >
              <thead>
                <tr>
                  <th scope='col'>Prodect-Name</th>
                  <th scope='col'>Category</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Image</th>
                  <th scope='col'>Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>Category</td>
                  <td>Description</td>
                  <td>Price</td>
                  {/* <td> */}
                  {/*   <Image */}
                  {/*     style={{ width: '50px', height: '50px' }} */}
                  {/*     src='/productimage/{{this._id}}.jpg' */}
                  {/*     alt='' */}
                  {/*   /> */}
                  {/* </td> */}
                  <td>
                    <a
                      href='/admin/edit-product?id={{this._id}}'
                      className='btn btn-primary'
                    >
                      Edit
                    </a>
                    <a
                      href='/admin/delete-product?id={{this._id}}'
                      /* onclick="return confirm('Are you sure to Delete {{this.Name}}')" */
                      className='btn btn-danger'
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
