import React from 'react'
import { Outlet } from 'react-router'
import Header from './Components/Header'


function RootLayout() {
  return (
    <div>
        <Header />
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default RootLayout