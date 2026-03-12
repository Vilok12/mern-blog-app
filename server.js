import exp from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { userapp } from './api/userapi.js'
import { adminapp } from './api/adminapi.js'
import { authorapp } from './api/authorapi.js'
import cookieParser from 'cookie-parser'
import { commonapp } from './api/commonapi.js'
config()   // process .env file
// create express application
const app=exp()
// add body parsing middleware
app.use(exp.json())
app.use(cookieParser())
// connect api
app.use('/userapi',userapp)
app.use('/adminapi',adminapp)
app.use('/authorapi',authorapp)
app.use('/commonapi',commonapp)
// connect to db
const connectdb=async()=>{
    try{
    await connect(process.env.DB_URL)
    console.log("database connected")
    app.listen(process.env.port,()=>{console.log("server is started")})
    }
    catch(err){
        console.log("database is not connected")
    }
}
connectdb()

// dealing with invalid path
app.use((req,res,next)=>{
    res.json({message:`${req.url} is invalid path`})
})

// error handling middleware
app.use((err,req,res,next)=>{
    console.log("error is ",err)
    res.status(400).json({message:"error",reason:err.message})
})
