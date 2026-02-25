const express  = require("express")
const { createChats, getChats, deleteChats } = require("../controllers/chatsController")
const { userAuth } = require("../middlewears/userAuth")

const chatRouter = express.Router()

chatRouter.get("/create", userAuth ,createChats)
chatRouter.get("/get",userAuth, getChats)
chatRouter.delete("/delete/:chatID", userAuth ,deleteChats)

module.exports = chatRouter