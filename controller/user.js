const user= require('../models/user')


exports.signup =(req, res)=> {
    console.log("res.body", req.body);
    const user = new User(res.body)
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                error
            });
        }
        res.json({
            user
        })
    })   
} 