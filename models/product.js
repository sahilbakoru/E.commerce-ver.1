const mongoose = require('mongoose');
const{ObjectId} = mongoose.Schema;
const productSchema = new mongoose.Schema({ 

    name:{
        type:String,
        trim:true,
        require:true,
        maxlenth:32
    },
    description:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        trim:true,
        require:true,
        maxlenth:32
    },
    category:{
        type:ObjectId,
        ref:'Category',
        required:true,
    },
    subcategory:{
        type:ObjectId,
        ref:'subCategory',
        required:true,
    },
    quantity:{
        type:Number,
        
    },
    sold:{
        type:Number,
        default:0
        
    },
    photo:{
        data:Buffer, 
        contentType:String
    },
    shipping:{
        type:Boolean,
        required:false

    }
    
},{timestamps:true})


module.exports = mongoose.model("Product",productSchema);