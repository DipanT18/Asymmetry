import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './Navbar.jsx'
import Hero from './Hero'
import Oppoheader from './Oppoheader.jsx'
import Weekly from './Weekly.jsx'
import Oppo from './Oppo.jsx'
import Footer from '../LoginPage/Footer.jsx'


function home() {
  return (
    <>
    <div classname = 'min-h-screen bg-white'>
      <Navbar />
      <Hero />
      <Oppoheader />
      <Oppo />
      <Weekly />
      <footer />
    </div>
    </>
  )
}

export default home