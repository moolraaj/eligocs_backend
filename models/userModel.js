const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
 


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter your name'],
        maxLength:[30]
    },
    email:{
        type:String,
        required:[true,'please enter your name'],
        unique:true,
        validate:[validator.isEmail,'please enter valid email']
    },
    password:{
        type:String,
        required:[true,'password is required'],
        select:false
    },
    avatar:{
        
            public_id:{
                type:String
            },
            url:{
                type:String
            }
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password=await bcrypt.hash(this.password,12)
})

userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRETKEY)
}
userSchema.methods.comparePassword=async function(returnpassword){
    return await bcrypt.compare(returnpassword,this.password)
}

const usermodel=mongoose.model('users',userSchema)
module.exports=usermodel

