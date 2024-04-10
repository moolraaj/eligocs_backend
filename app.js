const express=require('express')
const app=express()
const productRouter=require('./routers/productRouter')
const userRouter=require('./routers/userRoutes')
const errorMiddleware=require('./middleware/error')
app.use(express.json())
//error middleware

app.use('/api/v1',productRouter)
app.use('/api/v1',userRouter)


app.use(errorMiddleware)


module.exports=app