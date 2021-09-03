const mongoose = require('mongoose');
const crypto = require('crypto');
const uuid = require('uuid');


const userSchema = new mongoose.Schema({ 

    name:{
        type:String,
        trim:true,
        require:true,
        maxlenth:32
    },

    email:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },

    hashed_password:{
        type:String,
        required:true
    },

    about:{
        type:String,
        trim:true,
    },

    salt:String,
    role:{
        type:Number,
        default:0
    }, 

    history:{
        type:Array,
        default:[]
    }
    
},{timestamps:true})

// virtual field 

userSchema.virtual('password')
.set(function(password) {
    this_.password = password
    this.salt=uuid()
    this.hashed_password=this.encryptPassword(password)

})
.get(function(){
    return this.password
})

userSchema.method={
    encryptPassword:function(password) {
        if(!password) return''
        try {
            return crypto.createHmac('sha1',this.salt)
                             .update(password)
                             .digest('hex');   
        }catch(err) {
            return"";
        }
    }
}

module.exports = mongoose.model("User",userSchema);