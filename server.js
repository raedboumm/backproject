const express=require('express')
const app=express()
const dotenv=require("dotenv")
dotenv.config()
const cors=require('cors')
const port=process.env.PORT || 5000
app.use(express.json())
app.use(cors())
//DB Connection
const connectDB=require("./config/connectDB")
connectDB()

app.use('/api/user',require("./routes/UserRoutes"))
app.use('/api/admin',require("./routes/AdminRoutes"))


//Create server
app.listen(port,(err)=>{err? console.log(err):console.log("Server is running in port:",port)})
