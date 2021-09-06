exports.userSignupValidator = (req,res,next) => {
   req. check("name", "Name is required").notEmpty();
   req. check("email", "Email must contain 3 to 40 characters")
       .matches(/.+\@.+\..+/)
       .withMessage("Please enter a valid email address")
       .isLength({
           min:4,
           max:40
       })
   req. check("password","Password is required").notEmpty();
   req. check("password")
       .isLength({min:6})
       .withMessage("Password must contain at least six character")
       .matches(/\d/)
       .withMessage("Password must contain a Number")
       const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error=>error.msg)[0]
        return res.status(400).json({error:firstError})
    }  
    next() 
}