const user = require('../models/user')

exports.userById = (req,res, next,id)=>{
    user.findById(id).exec((err,user)=>{
        if(err|| !user){
            return res.status(400).json({
                error:"user not found"
            })
        }
        req.profile= user
        next()
    })

}
// user read 
exports.read=(req,res)=>{ 
   req.profile.hashed_password = undefined 
   req.profile.salt = undefined
   return res.json(req.profile)
}

// user update 
exports.update =(req, res)=>{ 
    user.findOneAndUpdate(
        {_id: req.profile.id},
        {$set:req.body},
        {new:true},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"you are not  authorize to perform this operation"
                })
            }

            user.hashed_password= undefined
            user.salt= undefined
            res.json(user)
        }

    )
}
