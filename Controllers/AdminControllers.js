const Order = require('../models/OrderSchema')
const Product=require('../models/ProductSchema')

const AddProduct=async(req,res)=>{
    try {
        // const {name,description,price,poster}=req.body
        const NewProduct=await Product.create(req.body)
        res.status(201).json({msg:"Succsufully Created",NewProduct})
    } catch (error) {
        res.status(500).json({msg:"Sommething went Wrong /AddProduct/",error})

    }
}

const DeleteProduct=async(req,res)=>{
    try {
        const DeleteProduct=await Product.findByIdAndDelete(req.params.id)
        res.status(201).json({msg:"Succsufully Deleted",DeleteProduct})
    } catch (error) {
        res.status(500).json({msg:"Sommething went Wrong /DeleteProduct/",error})
    }
}
const UpdateProduct=async(req,res)=>{
    try {
        const UpdateProduct=await Product.findByIdAndUpdate(req.params.id,{...req.body})
        res.status(201).json({msg:"Succsufully Updated",UpdateProduct})
    } catch (error) {
        res.status(500).json({msg:"Sommething went Wrong /UpdateProduct/",error})
    }
}

const GetAllOrders=async(req,res)=>{
    try {
        const getAllOrders=await Order.find()
        res.status(200).json({msg:"Get all Orders",getAllOrders})
    } catch (error) {
        res.status(500).json({msg:"Sommething went Wrong /GetAllOrders/",error})
    }
}


module.exports={AddProduct,DeleteProduct,UpdateProduct,GetAllOrders}
