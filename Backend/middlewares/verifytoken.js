import jwt from 'jsonwebtoken'
export const verifytoken=(...allowedRoles)=>{
    return async(req,res,next)=>{
        try{
    // read token from req
    let token=req.cookies.token
    if (!token){
        return res.status(400).json({message:"unauthorized req,please login"})
    }
    // verify the validity of token (decoding the token)
    let decodedtoken=jwt.verify(token,process.env.JWT_SECRET)
    // check if res is allowd
    if(!allowedRoles.includes(decodedtoken.role)){
        return res.status(401).json({message:"Forbidden req,you dont have access to this resource"})
    }
    req.user=decodedtoken
    
    // forward req to next middleware
    next()
}
catch(err){
    if(err.name==='TokenExpiredError'){
        return res.status(401).json({message:"Session expired. please login"})

    }
    if(err.name==='JsonWebTokenError'){
        return res.status(401).json({message:"invalid token. please login"})

    }
}
}
}