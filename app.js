const express = require("express")
const cors = require("cors")
const connectDB = require("./configs/database")
require("dotenv/config")
const cp = require('cookie-parser')
const userRouter = require("./routs/userRouts")
const chatRouter = require("./routs/chatRoutes")
const messageRouter = require("./routs/messageRoutes")

const app = express()
app.use(express.static("./public"))
app.use(cors({origin : "http://localhost:5173" , credentials : true}))
app.use(cp())
app.use(express.json())
connectDB()

app.use('/api/user', userRouter)
app.use("/api/chat" , chatRouter)
app.use("/api/message" , messageRouter)

app.listen(process.env.PORT || 3000, () =>{
    console.log("Server is running in the port " + process.env.PORT )
})