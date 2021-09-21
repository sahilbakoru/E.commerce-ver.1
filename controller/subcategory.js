const subCategory = require('../models/subcategory')
const{errorHandler}= require('../helpers/dbErrorHandler')


exports.subcategoryById = (req,res,next,Id)=>{
    subCategory.findById(Id).exec((err,subcategory)=>{
        if(err||!subcategory){ 
            return res.status(400).json({
                error:"subcategory does not exist"
            })
        }
        req.subcategory=subcategory;
        next()
    })
}



exports.create=(req,res)=>{
    const subcategory = new subCategory(req.body)
    subcategory.save((err,data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({data})
    })
}

exports.read=(req,res)=>{ 
    return res.json(req.subcategory)
}