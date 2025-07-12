const mongoose=require('mongoose')


const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },

    price:{
        type:Number,
          required:true,
    },
    teast:{
        type:String,
        enum:['sweet','sour','spicy'],
        required:true,
        },
     is_drink:{
        type:Boolean,
        default:false,
     },

     ingredient:{
        type:[String],
        default:[],
     },
     num_sales:{
        type:Number,
        default:0,
     }


})

const MenuItem=mongoose.model('MenuItem',menuSchema)

module.exports=MenuItem;