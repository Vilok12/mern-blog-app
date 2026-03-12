import React from 'react'
import Register from './Components/Register'
import AddArticle from './Components/AddArticle'
import Login from './Components/Login'
import { createBrowserRouter,RouterProvider } from 'react-router'
import RootLayout from './RootLayout'
import Home from './Components/Home'
import UserProfile from './Components/UserProfile'
import AuthorProfile from './Components/AuthorProfile'
import {Toaster} from 'react-hot-toast'

function App() {
  const routerobj=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout />,
      children:[
        {
          path:'home',
          element:<Home />,
        },
        {
          path:'login',
          element:<Login />
        },
        {
          path:'register',
          element:<Register />
        },
        {
          path:'user-profile',
          element:<UserProfile />
        },
        {
          path:'author-profile',
          element:<AuthorProfile />
        },
      ]
    }
  ])
  return (
    <>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <RouterProvider router={routerobj} />
    </>
  )
}

export default App