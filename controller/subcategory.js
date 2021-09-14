const subCategory = require('../models/subcategory')
const{errorHandler}= require('../helpers/dbErrorHandler')

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