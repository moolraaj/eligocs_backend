const express=require('express')
const userController = require('../controller/userController')
const router=express.Router()

router.route('/register').post(userController.createSingleUser)
router.route('/login').post(userController.SingleLoginUser)
  
module.exports=router