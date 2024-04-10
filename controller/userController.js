const usermodel=require('../models/userModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError=require('../middleware/asyncErrors')



const createSingleUser = catchAsyncError(async (req, resp) => {
    const { name, email, password } = req.body;
    let user = await usermodel.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'this is a simple product id',
            url: 'this is a url'
        }
    });
    let token=await user.getJwtToken()
    resp.status(200).json({ success: true, token });
});


const SingleLoginUser=catchAsyncError(async(req,resp,next)=>{
    const {email,password}=req.body
    if(!email&&!password){
        return next(new ErrorHandler('please enter valid details',400))
    }
    let user=await usermodel.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorHandler('unser not found try once again',400))
    }

    const isPasswordMatched=await user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler('invalid credintials',400))
    }
    let token=await user.getJwtToken()
    resp.status(200).json({ success: true, token });
})



 

module.exports={
    createSingleUser,
    SingleLoginUser
    
}