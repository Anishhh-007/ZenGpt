
const express = require("express")
const { textController, imageController } = require("../controllers/textController")
const { userAuth } = require("../middlewears/userAuth")

const messageRouter = express.Router()

messageRouter.post("/text" ,userAuth, textController )
messageRouter.post("/image" ,userAuth, imageController )

module.exports = messageRouter