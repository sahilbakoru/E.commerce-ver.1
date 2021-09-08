const User= require('../models/user')
const jwt = require('jsonwebtoken') // to generate signed token 
const expressjwt = require('express-jwt') // for autrazation check
const{errorHandler}= require('../helpers/dbErrorHandler')

// signup control
exports.signup =(req, res)=> {
    console.log("req.body", req.body);
    const user = new User(req.body)
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            });
        }        
        user.salt= undefined;
        user.hashed_password= undefined;
        res.json({
            user
        })
    })   
} 

// signin control 
exports.signin = (req,res)=>{ 
    // find the user based  on the email. 
    const{email, password} = req.body
    User.findOne({email},(err,user)=>{ 
        if(err || !user) {
            return res.status(400).json({
                error:'User with that email does not exist, please signup.'
            })
        }
        //if user is found make sure that email and password are valid
        // create authenticte method in user model 
        if(!user.authenticte(password)){ 
            return res.status(401).json({
                error:'email and password dont match'
            })
        }
        // genrate a signed token with user id and secret
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
        // persist the token as 't' in cookie with expiry date
        res.cookie('t',token,{expire : new Date()+ 9999})
        // return response with user and token to frontend client
        const{_id, name, email, role}= user
        return res.json({token, user:{_id, name, email, role}})
    })
}


exports.signout = (req,res)=>{ 
    res.clearCookie("t");
    res.json({message:"signout succses"})

}

exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
  });

