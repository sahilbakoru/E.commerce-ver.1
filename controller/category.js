const Category = require('../models/category')
const{errorHandler}= require('../helpers/dbErrorHandler')

exports.categoryById = (req,res,next,Id)=>{
    Category.findById(Id).exec((err,category)=>{
        if(err||!category){ 
            return res.status(400).json({
                error:"category does not exist"
            })
        }
        req.category=category;
        next()
    })
}
// category create
exports.create=(req,res)=>{
    const category = new Category(req.body)
    category.save((err,data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({data})
    })
}

exports.read=(req,res)=>{ 
    return res.json(req.category)
}

exports.update = (req,res)=>{
    const category = req.category
    category.name= req.body.name
    category.save((err,data)=>{ 
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data)
    })

}

exports.remove1 = (req,res)=>{
    const category = req.category
    
    category.remove((err,data)=>{ 
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json({
            message:'category deleted'
        })
    })

}

exports.list = (req,res)=>{
    Category.find().exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data);
    })
   
}