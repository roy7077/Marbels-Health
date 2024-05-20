const express=require('express');
const app=express();
const fileUpload = require('express-fileupload');
const {dbConnect}=require('./Config/dbConnect');
const routes=require('./Routes/index');

require('dotenv').config();

// for parsing
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// 
app.get('/',(req,res)=>{
    res.send("hello");
})

const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log("server is listening at port ",PORT);
})

app.use('/api',routes);
dbConnect();