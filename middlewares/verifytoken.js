import jwt from 'jsonwebtoken'
export const verifytoken=async(req,res,next)=>{
    // read token from req
    let token=req.cookies.token
    if (token===undefined){
        return res.status(400).json({message:"unauthorized req,please login"})
    }
    // verify the validity of token (decoding the token)
    let decodedtoken=jwt.verify(token,process.env.JWT_SECRET)
    // forward req to next middleware
    next()
}