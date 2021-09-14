const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({ 

    name:{
        type:String,
        trim:true,
        require:true,
        maxlenth:32
    }

},{timestamps:true})

module.exports = mongoose.model("subCategory",subcategorySchema);