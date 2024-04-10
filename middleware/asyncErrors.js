module.exports=asyncFunction=>(req,resp,next)=>{
    Promise.resolve(asyncFunction(req,resp,next)).catch(next)

}