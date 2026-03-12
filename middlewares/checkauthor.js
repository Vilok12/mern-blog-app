import { usermodel } from "../models/usermodel.js"
export const checkauthor=async(req,res,next)=>{
      // get author id
        let authorid=req.params?.authid || req.body?.author
        // get author
        let author=await usermodel.findById(authorid)
        if(!author){
            const err=new Error("invalid author")
            err.status=401
            throw err
        }
        if (author.role!='AUTHOR'){
            const err=new Error("invalid role")
            err.status=401
            throw err
        }
        if (author.isActive==='false'){
            const err=new Error("author is not active")
            err.status=401
            throw err
        }
        next()
}