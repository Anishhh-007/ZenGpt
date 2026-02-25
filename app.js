const express = require("express")
const cors = require("cors")
const connectDB = require("./configs/database")
require("dotenv/config")
const cp = require('cookie-parser')
const userRouter = require("./routs/userRouts")
const chatRouter = require("./routs/chatRoutes")
const messageRouter = require("./routs/messageRoutes")
const path = require("path")

const app = express()
app.use(cors({origin : true , credentials : true}))
app.use(cp())
app.use(express.json())
connectDB()

app.use(express.static(path.join(__dirname, 'public', 'dist')));


app.use('/api/user', userRouter)
app.use("/api/chat" , chatRouter)
app.use("/api/message" , messageRouter)

app.listen(process.env.PORT || 3000, () =>{
    console.log("Server is running in the port " + process.env.PORT )
})