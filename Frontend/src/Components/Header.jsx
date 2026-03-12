import React from 'react'
import { NavLink } from 'react-router'

function Header() {
  return (
    <div>
        <nav className='flex justify-between p-7 bg-black text-white '>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq9U55SHTxVxIKtKBQpApml-jH9Q_g20tmPA&s" alt="" width='55px' />
        <h1 className='ml-50 text-3xl'>Blog App</h1>
        <ul className='flex gap-15 mx-12'>
          <li><NavLink to="/" className={({isActive})=>isActive?"bg-amber-600 p-2 rounded":""}>Home</NavLink></li>
          <li><NavLink to="register" className={({isActive})=>isActive?"bg-amber-600 p-2 rounded":""}>Register</NavLink></li>
          <li><NavLink to="login" className={({isActive})=>isActive?"bg-amber-600 p-2 rounded":""}>Login</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default Header