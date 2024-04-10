const productModel=require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError=require('../middleware/asyncErrors')
const ApiFeatures = require('../utils/apifeatures')


const getAllProducts=catchAsyncError(async(req,resp)=>{
    const resultPerPage=5
    let apiFeatures=new ApiFeatures(productModel.find(),req.query).search().filter().pagination(resultPerPage)
    let data=await apiFeatures.query
    resp.status(200).json({success:true,data})
    console.log(data)
})


const getSingleProducts=catchAsyncError(async(req,resp,next)=>{
    let id=req.params.id
    let data=await productModel.findById(id)
    if(!data){
        return next(new ErrorHandler('Product not found', 404));
    }
    resp.status(200).json({success:true,data})
    console.log(data)
})



//admin
const createNewProduct=catchAsyncError(async(req,resp,next)=>{
    let data=await  productModel.create(req.body)
  
    resp.status(200).json({success:true,data})
    console.log(data)
})

//admin

const updateSingleProduct=catchAsyncError(async(req,resp,next)=>{ 
    let id=req.params.id   
    
    let data=await productModel.findById(id)
    if(!data){
        return next(new ErrorHandler('Product not found', 404));
    }
    
    let result=await productModel.findByIdAndUpdate(id,req.body,
        {new:true,
        runValidators:true,
        useFindAndModify:false
    })
    resp.status(200).json({success:true,result})
    console.log(result)
})



const deleteSingleProduct=catchAsyncError(async(req,resp,next)=>{ 
    let id=req.params.id
   let data=await productModel.findById(id)
   if(!data){
    return next(new ErrorHandler('Product not found', 404));
   }
   await data.deleteOne()
   resp.status(200).json(
       {success:true,
       message:'product deleted successfully'
   })
   console.log(data)
})





module.exports={
    getAllProducts,
    getSingleProducts,
    createNewProduct,
    updateSingleProduct,
    deleteSingleProduct,
   
}

 