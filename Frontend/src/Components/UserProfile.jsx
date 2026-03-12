import React from 'react'
import { useAuth } from '../store/authStore'
import { useNavigate } from 'react-router'
import {toast} from 'react-hot-toast'
import { useState ,useEffect} from 'react'
import axios from 'axios'


function UserProfile() {
  const logout=useAuth(state=>state.logout)
  const navigate=useNavigate()
  const [articles,setarticles]=useState([])
  const onLogout=async()=>{
    await logout()
    navigate('/login')
    toast.success('logged out successfully')
  }
  

  useEffect(()=>{
    // Fetch articles
  const getarticles = async () => {
    try{
      let res = await axios.get("http://localhost:3000/userapi/article",{withCredentials:true})
      console.log(res)
      setarticles(res.data.payload)
    }
    catch(err){
      console.log(err)
      toast.error("Failed to load articles")
    }
  }
  getarticles()
  },[])
  return (
  <div className="min-h-screen flex flex-col items-center justify-center p-6">

    {articles.length === 0 ? (
      <p className="text-gray-500">No Articles Available</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

        {articles.map((article)=>(
          <div key={article._id} className="bg-gray-100 p-4 rounded shadow hover:shadow-lg transition">

            <h3 className="text-lg font-semibold mb-2">
              {article.title}
            </h3>

            <p className="text-gray-600 mb-3">
              {article.content?.slice(0,100)}...
            </p>

            <p className="text-sm text-gray-500">
              Author: {article.author?.firstname}
            </p>

          </div>
        ))}

      </div>
    )}

    <button onClick={onLogout} className="bg-blue-500 text-white px-4 py-2 rounded mt-8">
      Logout
    </button>

  </div>
)
}

export default UserProfile