const express=require('express');
const app=express();
const db=require('./db');
const person=require('./model.js');
const bodyParser = require('body-parser')
const MenuItem = require("./menu");
require('dotenv').config();


app.use(bodyParser.json()); //req-body

app.get('/',function(req,res){
    res.send('hi there')
})



const personRoutes=require('./personRoutes.js') // import thr router files
app.use('/person',personRoutes)   //use the router

const menuRoutes=require('./menuRoutes.js')
app.use('/menu',menuRoutes)



const PORT=  process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})