const mogoose=require('mongoose')
const productSchema=new mogoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        trim:true
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
    price:{
        type:Number,
        required:[true,'price is required'],
        maxLength:[8,'max length is not exceed above 8']
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String
            },
            url:{
                type:String
            }
        }
    ],
    category:{
        type:String,
        required:[true,'category is reqyured']
    },
    stock:{
        type:Number,
        required:[true,'stock is reqyured'],
        default:1,
        maxLength:[4,'max length not exceed 4 characters']
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

 



const productModel=mogoose.model('products',productSchema)
module.exports=productModel