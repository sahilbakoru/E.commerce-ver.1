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


//subcategory create.
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


// update delete getall ..from here. 

exports.update = (req,res)=>{
    const subcategory = req.subcategory
    subcategory.name= req.body.name
    subcategory.save((err,data)=>{ 
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data)
    })

}

exports.remove2 = (req,res)=>{
    const subcategory = req.subcategory
    
    subcategory.remove((err,data)=>{ 
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json({
            message:'subcategory deleted'
        })
    })

}

exports.list = (req,res)=>{
    subCategory.find().exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data);
    })
   
}
