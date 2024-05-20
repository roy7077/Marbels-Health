const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    contactNumber:{
        type:Number,
        required:true,
    },
    emailID:{
        type:String,
        required:true,
    },
    userDes:{
        type:String,
        required:true,
    },
    DOB:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model("User",userSchema);