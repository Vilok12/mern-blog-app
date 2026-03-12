import exp from 'express'
import { register } from '../services/authservice.js'
import { authenticate } from '../services/authservice.js'
import { usermodel } from '../models/usermodel.js'
import { articlemodel } from '../models/articlemodel.js'
import { checkauthor } from '../middlewares/checkauthor.js'
import { verifytoken } from '../middlewares/verifytoken.js'
export const authorapp=exp.Router() 

// register author
authorapp.post('/user',async(req,res)=>{
    // get userobj from body
    let userobj=req.body
    // call register
    const newuserobj=await register({...userobj,role:"AUTHOR"})
    res.status(200).json({message:"author created",payload:newuserobj})
})

// create article (protected route)
authorapp.post('/article',verifytoken,checkauthor,async(req,res)=>{
    // get article 
    let articleobj=req.body
    // create article document
    let articledoc=await articlemodel(articleobj)
    // save document
    let createddoc=articledoc.save()
    // send res
    res.status(201).json({message:"article created",payload:createddoc})

})

// read articles of author(protected route)
authorapp.get('/article/:authid',verifytoken,checkauthor,async(req,res)=>{
    // get author id
    let authorid=req.params.authid
    // get articles of particular author
    let articles=await articlemodel.find({author:authorid,isActive:true}).populate("author","firstname email")
    res.status(201).json({message:"articles are:",paylaod:articles})
})

// edit article (protected route)
authorapp.put('/article',verifytoken,checkauthor,async(req,res)=>{
    // get modified article
    let {author,articleid,title,content}=req.body
    // find article
    let articleofdb=await articlemodel.findOne({_id:articleid,author:author})
    if(!articleofdb){
        const err=new Error("article not found")
        err.status=401
        throw err
    }
    // find articleand update
    let newarticledoc=await articlemodel.findByIdAndUpdate(articleid,{$set:{title,content}},{new:true,runValidators:true})
    // send updated article
    res.status(201).json({message:"article updated",payload:newarticledoc})

})

// delete(soft delete) article (protected route)
authorapp.put('/delarticle',verifytoken,checkauthor,async(req,res)=>{
    let {author,articleid}=req.body
    // find article
    let articleofdb=await articlemodel.findOne({_id:articleid,author:author})
    if(!articleofdb){
        const err=new Error("article not found")
        err.status=401
        throw err
    }
    // find articleand update
    let newarticledoc=await articlemodel.findByIdAndUpdate(articleid,{$set:{isActive:false}},{new:true,runValidators:true})
    res.status(201).json({message:"article blocked",payload:newarticledoc})
})
