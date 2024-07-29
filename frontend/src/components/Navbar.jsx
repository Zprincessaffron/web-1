import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav>
        <Link style={{paddingRight:20}} to={'/'}>Home</Link>
        <Link style={{paddingRight:20}} to={'/register'}>Register</Link>
        <Link style={{paddingRight:20}} to={'/login'}>Login</Link>
      </nav>
    </div>
  )
}

export default Navbar
