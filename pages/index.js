import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar.js'

export default function Home() {
  return (
    <div>
      <NavBar />
      <div >
        <h1>E-Commerce Website</h1>
      </div>
    </div>
  )
}
