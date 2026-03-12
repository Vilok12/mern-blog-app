import exp from 'express'
import { register } from '../services/authservice.js'
import { authenticate } from '../services/authservice.js'
import { verifytoken } from '../middlewares/verifytoken.js'
import { articlemodel } from '../models/articlemodel.js'
export const userapp=exp.Router() 

// register user
userapp.post('/user',async(req,res)=>{
    // get userobj from body
    let userobj=req.body
    // call register
    const newuserobj=await register({...userobj,role:"USER"})
    res.status(201).json({message:"user created",payload:newuserobj})
})

// read all articles(protected route)
userapp.get('/article',verifytoken("USER"),async(req,res)=>{
    // get all articles
    let articles=await articlemodel.find({isActive:true}).populate("author","firstname email")
    // send res
    res.status(200).json({message:"articles are:",payload:articles})

})

// add comment to an article(protected route)
userapp.put('/article',verifytoken("USER"),async(req,res)=>{
    // get id and comment from body
    let {user,articleid,comment}=req.body
    // get article by id
    // update article
    let newarticle=await articlemodel.findByIdAndUpdate(articleid,{$push:{comments:{user:user,comment:comment}}},{new:true,runValidators:true})
    // if article not found
    if(!newarticle){
    res.status(401).json({message:"article not found"})
    }
    // send res
    res.status(200).json({message:"comment added",payload:newarticle})
})