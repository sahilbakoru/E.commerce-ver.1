const formidable = require('formidable')
const _ = require('lodash')
const fs= require('fs')
const{errorHandler}= require('../helpers/dbErrorHandler')
const Product = require('../models/product')

exports.productById=(req,res,next,Id)=>{
    Product.findById(Id).exec((err,product)=>{
        if(err||!product){
            return res.status(400).json({ 
                error:'Product not found'
            })
        }
        req.product=product
        next()
    })
}

exports.read=(req,res)=>{ 
    req.product.photo=undefined
    return res.json(req.product)
}

exports.create= (req,res)=>{ 
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields,files)=>{ 
        if(err) { 
           
            return res.status(400).json({ 
                error:'Image could not be uploaded'
            })
        }

        //check for all fields 
        const{name,
             description,
             price,
             category,
             subcategory,
             quantity,
             shipping}= fields

             if(!name||
                !description||
                !price||
                !category||
                !subcategory||
                !quantity||
                !shipping){
                return res.status(400).json({
                    error:"all fields are required"
                })
            }

        const product = new Product(fields)
  // 1kb= 1000
  //1MB= 1000000
        if(files.photo){

           //console.log("FILES PHOTO:",files.photo)
           if(files.photo.size>1000000){
               return res.status(400).json({
                   error: "File must be less then 1 mb in size."
               })
           }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType=files.photo.type
        }
        product.save((err,result)=>{
            if(err) {
                console.log("Error3 ");
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json({result})
        })


    })

}

exports.remove = (req,res)=> { 
    let product = req.product
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
         message: "Product deleted "
        })
    })
}

// Product update.
exports.update = (req,res)=>{ 
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields,files)=>{ 
        if(err) { 
           
            return res.status(400).json({ 
                error:'Image could not be uploaded'
            })
        }

        //check for all fields 
        const{name,
             description,
             price,
             category,
             subcategory,
             quantity,
             shipping}= fields

             if(!name||
                !description||
                !price||
                !category||
                !subcategory||
                !quantity||
                !shipping){
                return res.status(400).json({
                    error:"all fields are required"
                })
            }

        let product = req.product
         product=_.extend(product, fields)   


  // 1kb= 1000
  //1MB= 1000000
        if(files.photo){

           //console.log("FILES PHOTO:",files.photo)
           if(files.photo.size>1000000){
               return res.status(400).json({
                   error: "File must be less then 1 mb in size."
               })
           }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType=files.photo.type
        }
        product.save((err,result)=>{
            if(err) {
                console.log("Error3 ");
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json({result})
        })


    })

}