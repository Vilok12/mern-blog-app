import {create} from 'zustand'
import axios from 'axios'

export const useAuth=create(set=>({
    currentUser:null,
    isAuthenticated:false,
    loading:false,
    error:null,
    login:async(userCredWithRole)=>{
        const {role,...userCredObj}=userCredWithRole
        try{
            // set loading state
            set({loading:true,error:null})
            // make api req
            let res=await axios.post("http://localhost:3000/commonapi/authenticate",userCredObj,{withCredentials:true})
            console.log("res is",res)
            // update state
            set({ loading:false,
                error:null,
                isAuthenticated:true,
                currentUser:res.data.payload
            })
        }
        catch(err){
            console.log("err is",err)
            // set errors
            set({
                loading:false,
                isAuthenticated:false,
                currentUser:null,
                error:err.message
            })
        }
    },
    logout:async()=>{
        try{
        // set loading state
        set({
                loading:false,
                error:null
            })
        // make logout api req
        let res=await axios.get("http://localhost:3000/commonapi/logout",{withCredentials:true})
        // update state
        set({
                loading:false,
                isAuthenticated:false,
                currentUser:null
            })
        }
        catch(err){
        set({
                loading:false,
                isAuthenticated:false,
                currentUser:null,
                error:err.response?.data?.error || "Logout failed"
            })
        }
    },
   
}
))