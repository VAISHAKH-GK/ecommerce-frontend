import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar.js'

function Product({ item, description, price }) {
  return (
    <div className={`col-3 ${styles.product}`}>
      <Image
        src='/image.png'
        alt='GFG logo served with static path of public directory'
        height='350'
        width='200'
      />
      <h1>{item}</h1>
      <p>{description}</p>
      <h3>{price}</h3>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className={`${styles.main}`}>
        <div className='container'>
          <div className={`col-12 ${styles.products}`}>
            <Product item='phone' description='good phone' price='10000' />
            <Product item='phone' description='good phone' price='10000' />
            <Product item='phone' description='good phone' price='10000' />
            <Product item='phone' description='good phone' price='10000' />
            <Product item='phone' description='good phone' price='10000' />
            <Product item='phone' description='good phone' price='10000' />
          </div>
        </div>
      </div>
    </div>
  )
}
