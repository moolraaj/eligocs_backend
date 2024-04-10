const express=require('express')
const productController = require('../controller/productController')
const router=express.Router()

router.route('/products').get(productController.getAllProducts)
router.route('/product/new').post(productController.createNewProduct)
router.route('/product/:id').put(productController.updateSingleProduct).delete(productController.deleteSingleProduct).get(productController.getSingleProducts)

module.exports=router