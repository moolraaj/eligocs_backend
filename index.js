const app=require('./app')
const dotenv=require('dotenv')



//congif .env file
dotenv.config({path:'config/config.env'})


//handing uncaught error

process.on('uncaughtException',(err)=>{
    console.log(`Error : ${err.message}`)
    process.exit(1)

})


//databse connction
const databaseConnection=require('./config/database')
databaseConnection()

 





let server=app.listen(process.env.PORT,()=>{
    console.log(`server working on the port ${process.env.PORT}`)
})



//unhandled promise rejection
process.on('unhandledRejection',err=>{
    console.log(`Error : ${err.message}` )
    server.close(()=>{
        process.exit(1)

    })

})