const express=require('express')
const route=express.Router()
const {Register,Login,getProduct, createOrder, getUserOrders}=require('../Controllers/UserControllers')
const { UserMiddleware } = require('../authMiddleware/UserMiddleware')

route.post('/register',Register)
route.post('/login',Login)
route.get('/getproducts',getProduct)
route.post('/createorder',UserMiddleware,createOrder)
route.get('/getuserorders',UserMiddleware,getUserOrders)





module.exports=route