import exp from 'express'
import { verifytoken } from '../middlewares/verifytoken.js'
import { usermodel } from '../models/usermodel.js'
export const adminapp=exp.Router() 

// authenticate admin
// read all articles
// block or unblock user roles

// block users
adminapp.put('/block/:id',verifytoken,async(req,res)=>{
    // get user by id
    let userid=req.params.id
    // find user by id and update
    let newuserobj=await usermodel.findByIdAndUpdate(userid,{$set:{isActive:false}},{new:true})
    // send res
    res.status(200).json({message:"user blocked",payload:newuserobj})
})


// unblock users
adminapp.put('/unblock/:id',verifytoken,async(req,res)=>{
    // get user by id
    let userid=req.params.id
    // find user by id and update
    let newuserobj=await usermodel.findByIdAndUpdate(userid,{$set:{isActive:true}},{new:true})
    // send res
    res.status(200).json({message:"user unblocked",payload:newuserobj})
})
