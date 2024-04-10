const ErrorHandler=require('../utils/errorHandler')

module.exports=(err,req,resp,next)=>{
    console.log("Error middleware triggered");
    err.statusCode=err.statusCode||500
    err.message=err.message||'internal server error'



if(err.name==='CastError'){
    let message=`resources not found ${err.path}`
    err=new ErrorHandler(message,400)
}
    resp.status(err.statusCode).json({
        success:false,
        message:err.message
    })
    
 
}