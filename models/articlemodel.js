import {Schema,model} from 'mongoose'

// create user comment schema
const usercommentschema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    comment:{
        type:String
    }
})

// create article schema
const articleschema=new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:[true,"author id required"]
    },
    title:{
        type:String,
        required:[true,"title is required"]
    },
    content:{
        type:String,
        required:[true,"conetent is required"]
    },
    comments:[usercommentschema],
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
export const articlemodel=model("article",articleschema)
