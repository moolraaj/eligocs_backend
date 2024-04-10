const mogoose=require('mongoose')

const dbConnection=async()=>{
     mogoose.connect(process.env.DB_URI).then((data)=>{
         console.log('databse connected on port' +" "+ data.connection.host)
     })  
        
    
}

module.exports=dbConnection