import React, { useState } from "react";
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from 'react-router'
import { NavLink } from "react-router";

function Register() {

  const { register, handleSubmit ,reset} = useForm();
  const [loading,setloading]=useState(false)
  const [error,seterror]=useState(null)
  const navigate=useNavigate()

  const onRegister = async(userObj) => {
    try{
      let {role,...user}=userObj
      // make api req to user/author registration
      if(role==="user"){
        let resobj=await axios.post("http://localhost:3000/userapi/user",user)
        console.log("res obj is:",resobj )
        if(resobj.status===201){
          navigate('/login')
        }
        let res=resobj.data
        console.log("response from user-api",res)
      }
      if(role==="author"){
        let resobj=await axios.post("http://localhost:3000/authorapi/user",user)
        console.log("res obj is:",resobj )
        if(resobj.status===201){
          navigate('/login')
        }
        let res=resobj.data
        console.log("response from user-api",res)
      }
      }
    catch(err){
      seterror(err.message)
    }
    reset()
  };

  return (
    <div className="flex flex-col items-center mt-6">

      <h2 className="text-2xl font-semibold mb-6">Register</h2>

      <div className="bg-gray-200 p-10 w-175 rounded">

        <form onSubmit={handleSubmit(onRegister)} className="flex flex-col gap-6">

          {/* Role Selection */}
          <div className="flex items-center gap-6 text-lg">
            <span className="font-medium">Select Role</span>

            <label className="flex items-center gap-2">
              <input type="radio" value="user" {...register("role")}
              />
              User
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" value="author" {...register("role")}
              />
              Author
            </label>
          </div>

          {/* First and Last Name */}
          <div className="flex gap-6">
            <input type="text" placeholder="First name" {...register("firstname")} className="bg-gray-300 p-3 w-full rounded"
            />

            <input type="text" placeholder="Last name" {...register("lastname")} className="bg-gray-300 p-3 w-full rounded"
            />
          </div>

          {/* Email */}
          <input type="email" placeholder="Email" {...register("email")} className="bg-gray-300 p-3 rounded w-full"
          />

          {/* Password */}
          <input type="password" placeholder="Password" {...register("password")} className="bg-gray-300 p-3 rounded w-full"
          />

          {/* Profile Image */}
          <input type="text" placeholder="profileimageurl" {...register("profileimageurl")} className="bg-gray-300 p-3 rounded w-full" />

          {/* Register Button */}
          <button type="submit" className="bg-sky-500 text-black font-medium py-3 px-8 rounded w-40 self-center hover:bg-sky-600"> Register </button>

          <div>
            <p className=" ml-50">Already have an account? <NavLink to='/login' className='text-purple-600 self-center hover:text-purple-950'>Login</NavLink></p>
            
          </div>

        </form>
      </div>
    </div>
  );
}

export default Register;