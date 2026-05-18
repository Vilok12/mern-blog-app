import React from 'react'
import { Outlet } from 'react-router'
import Header from './Components/Header'
import { useEffect } from 'react'
import { useAuth } from './store/authStore'


function RootLayout() {
  const check_auth=useAuth((state)=>state.check_auth)
  useEffect(()=>{
    check_auth();
  },[])
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