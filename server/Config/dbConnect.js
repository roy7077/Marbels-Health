const mongoose=require('mongoose');
require('dotenv').config();

exports.dbConnect=()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("Databased connected successfully")
    })
    .catch((error)=>{
        console.log("Error while connecting to database");
    })
}