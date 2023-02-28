const express = require('express'); 

const app = express();
const user = require('../model/schema');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'}) 
const PORT = process.env.PORT ; 
//making router link to route it easy
require('../db/conn');
app.use(express.json());
app.use(require('../router/auth')); 

//here we are using middleware


// console.log(`Aashu singh rana`); 
app.listen(PORT, ()=>{
    console.log(`server is running at port number ${PORT}`)
})

 