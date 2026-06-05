import React from 'react'
import ReactDOM from 'react-dom/client'
import {Link, NavLink} from 'react-router-dom'

function oppoheader() {
  return (
    <header className=''>
      <nav className=''>
        <div className=''>
          <Link to = "/" className=''>Asymmetry</Link>
        </div>
      </nav>
    </header>
  )
}

export default oppoheader