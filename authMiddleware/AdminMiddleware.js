const jwt=require("jsonwebtoken")

const AdminMiddleware=async(req,res,next)=>{
    try {
       const {token} =req.headers
       if(!token){
        res.status(400).json({msg:"You are not authorized"})
       }
       else{
        const Verifytoken=await jwt.verify(token,process.env.JWT)
        if(!Verifytoken){
            res.status(400).json({msg:"You are not authorized"})

        }
        else{
            if(Verifytoken.role=="admin"){
                next()
            }
            else{
                res.status(400).json({msg:"You are not authorized"})
            }
        }
       }
    } catch (error) {
        res.status(500).json({msg:"Sommething went Wrong /AdminAuthMiddleware/",error})

    }
}

module.exports={AdminMiddleware}