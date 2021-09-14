const mongoose = require('mongoose');
const{ObjectId} = mongoose.Schema;
const productSchema = new mongoose.Schema({ 

    name:{
        type:String,
        trim:true,
        require:true,
        maxlenth:32
    },
    discription:{
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
    quantity:{
        type:Number,
        
    },
    photo:{
        data:buffer, 
        contentType:String
    },
    shipping:{
        required:true,
        type:Boolean

    }
    
},{timestamps:true})


module.exports = mongoose.model("Product",productSchema);