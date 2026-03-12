import {model,Schema} from 'mongoose'
const userschema=new Schema({
    firstname:{ 
        type:String,
        required:[true,"first name is required"]
    },
    lastname:{ 
        type:String
    },
    email:{ 
        type:String,
        required:[true,"email is required"],
        unique:[true,"email should be unique"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    profileimageurl:{ 
        type:String
    },
    role:{
        type:String,
        enum:["AUTHOR","USER","ADMIN"],
        required:[true,"{Value} is an invalid role"]
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true,
    strict:"throw",
    versionKey:false
})
// create model
export const usermodel= model("user",userschema)