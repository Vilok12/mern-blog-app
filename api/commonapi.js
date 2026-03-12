import exp from 'express'
import { authenticate } from '../services/authservice.js'
import { verifytoken } from '../middlewares/verifytoken.js'
import { usermodel } from '../models/usermodel.js'
import {hash,compare} from 'bcryptjs'
export const commonapp=exp.Router()

// login
commonapp.post('/authenticate',async(req,res)=>{
    // get userobj from body
        let userobj=req.body
        // call authenticate
        let {token,user}=await authenticate(userobj)
        // save token as http only cookie
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"lax",
            secure:false
        })
        res.status(200).json({message:"login success",payload:user})
})

// logout
commonapp.get('/logout',async(req,res)=>{
    // clear cookie named 'token'
    res.clearCookie('token',{
        httpOnly:true,  //must match orginal set settings
        secure:false,
        sameSite:'lax'
    })
    res.status(200).json({message:'logged out successfully'})
})



//   change password
commonapp.put('/changepass',verifytoken,async(req,res)=>{
    // get email,password,newpassword
    let {email,oldpassword,newpassword}=req.body
    // get user by email
    let user=await usermodel.findOne({email:email})
    // check user exist
    if(!user){
        const err=new Error("user not exist")
        err.status=401
        throw err
    }
    // compare password
    let passwordcheck=await compare(oldpassword,user.password,)
    if(!passwordcheck){
        const err=new Error("wrong password")
        err.status=401
        throw err
    }
    // update user password to hashed
    user.password=await hash(newpassword,12)
    // save user
    user.save()
    // send res
    res.status(200).json({message:`password changed ${user}`})
})