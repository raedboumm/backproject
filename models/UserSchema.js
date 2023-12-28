const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    name:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,
    enum:["user","admin"],
    default:"user"
    }

})

const User=mongoose.model("users",UserSchema)

module.exports=User