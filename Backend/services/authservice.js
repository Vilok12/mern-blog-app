import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { usermodel } from '../models/usermodel.js'

// register function
export const register=async(userobj)=>{
    // create document
    const userdoc=new usermodel(userobj)
    // validate for empty password
    await userdoc.validate()
    // hash and replace plain password
    userdoc.password=await bcrypt.hash(userdoc.password,12)
    // save
    const created=await userdoc.save()
    // convert document to object to remove password
    const newuserobj=created.toObject()
    // remove password
    delete newuserobj.password
    // return user obj without password
    return newuserobj
}


// authenticate the user
export const authenticate=async({email,password})=>{
    // check user with email and role
    let user=await usermodel.findOne({email})
    if (!user){
        const err=new Error("invalid email")
        err.status=401
        throw err
    }
    // check if user is blocked
    if (user.isActive===false){
        const err=new Error("user was blocked by admin")
        err.status=401
        throw err
    }
    // check password
    let ismatch=bcrypt.compare(password,user.password)
    if (!ismatch){
        const err=new Error("invalid password")
        err.status=401
        throw err
    }
    // generate token
    const token=jwt.sign({userid:user._id,role:user.role,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    )

    const userobj=user.toObject()
    delete userobj.password

    return {token,user:userobj}
}