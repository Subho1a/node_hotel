const mongoose=require('mongoose');

const mongoURL='mongodb://localhost:27017/hotel'//define  mongoodb connectet url

//set up mongodb connection

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db=mongoose.connection;  //get the default connection

db.on('connected',()=>{
    console.log('Connected to MongoDB server');
})
db.on('disconnected',()=>{
    console.log('Disconnected to MongoDB server');
})
db.on('error',()=>{
    console.log('MongoDB connection Error:',err);
    
})



module.exports=db;