const User=require("../models/UserSchema")
const Product=require("../models/ProductSchema")

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const Order = require("../models/OrderSchema")
const Register=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        const existUser=await User.findOne({email:email})
        if(existUser){
            res.status(400).json({msg:"User Already Exist,Pls Login"})
        }
        else{
           const hashPW=await bcrypt.hash(password,10)
           console.log(hashPW)
           const user= await User.create({name,email,password:hashPW})
           const token=await jwt.sign({id:user._id,role:user.role},process.env.JWT,{expiresIn:"5D"})
           res.status(201).json({msg:"User Created",token:token})
        }

    } catch (error) {
        res.status(500).json({msg:"Sommething went Wrong /Register/",error})
    }
}


const Login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const existUser=await User.findOne({email:email})
        if(!existUser){
            res.status(400).json({msg:"Make sure to register first!"})
        }
        else{
            const verifyPassword=await bcrypt.compare(password,existUser.password)
            if(!verifyPassword){
                res.status(400).json({msg:"Wrong password,Pls try again!"})
            }
            else{
                const token=await jwt.sign({id:existUser._id,role:existUser.role},process.env.JWT,{expiresIn:"5D"})
                res.status(200).json({msg:"Welcome!"+" "+existUser.name,token})
            }
        }
    } catch (error) {
        res.status(500).json({msg:"Sommething went Wrong /Login/",error})

    }
}

const getProduct=async(req,res)=>{
    try {
        const Products=await Product.find()
        res.status(201).json({msg:"Get All Products",Products})
    } catch (error) {
        res.status(500).json({msg:"Sommething went Wrong /UpdateProduct/",error})
    }
}

const createOrder=async(req,res)=>{
    try {
        const {userId,productList}=req.body
        const newOrder=await Order.create({products:productList,owner:userId})
        res.status(201).json({msg:"Send Order!",newOrder})
    } catch (error) {
        res.status(500).json({msg:"Sommething went Wrong /createOrder/",error})
    }
}
const getUserOrders=async(req,res)=>{
    try {
        const {userId}=req.body
        const UserOrders=await Order.find({owner:userId})
        res.status(200).json({msg:"Get all User Orders!",UserOrders})
    } catch (error) {
        res.status(500).json({msg:"Sommething went Wrong /getUserOrders/",error})
    }
}
module.exports={Register,Login,getProduct,createOrder,getUserOrders}