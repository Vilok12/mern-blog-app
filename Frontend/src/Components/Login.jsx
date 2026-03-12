import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import {toast} from 'react-hot-toast'

function Login() {

  const { register, handleSubmit, reset } = useForm();

    // get function from zustand
  const login = useAuth((state) => state.login);
  const isAuthenticated=useAuth((state)=>state.isAuthenticated)
  const currentUser=useAuth((state)=>state.currentUser)
  const navigate=useNavigate()
  const error=useAuth((state)=>state.error)

  const onLogin = async(userCred) => {
    await login(userCred);   // call login function
  };

  useEffect(()=>{
    console.log(isAuthenticated)
    if(isAuthenticated){
      if(currentUser.role==='USER'){
        toast.success('logged in successfully')
      navigate('/user-profile')
      }
      if(currentUser.role==='AUTHOR'){
        toast.success('logged in successfully')
        navigate('/author-profile')
      }
  }},[isAuthenticated,currentUser])

  return (
    <div className="flex flex-col items-center mt-6">

      <h2 className="text-2xl font-semibold mb-6">Login</h2>

      <div className="bg-gray-200 p-10 w-175 rounded">

        <form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-6">

          {/* Role Selection */}
          <div className="flex items-center gap-6 text-lg">
            <span className="font-medium">Select Role</span>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="user"
                {...register("role")}
              />
              User
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="author"
                {...register("role")}
              />
              Author
            </label>
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="bg-gray-300 p-3 rounded w-full"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="bg-gray-300 p-3 rounded w-full"
          />

          {/* Login Button */}
          <button
            type="submit"
            className="bg-sky-500 text-black font-medium py-3 px-8 rounded w-40 self-center hover:bg-sky-600"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;