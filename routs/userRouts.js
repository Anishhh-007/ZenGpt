const express = require('express')
const { registerController } = require('../controllers/registerController')
const { loginController } = require('../controllers/loginController')
const { userAuth } = require('../middlewears/userAuth')
const { getAuthUserController } = require('../controllers/getUserController')
const { logoutController } = require('../controllers/logoutController')

const userRouter = express.Router()

userRouter.post('/register' , registerController)
userRouter.post('/login' , loginController)
userRouter.post('/logout',userAuth , logoutController )
userRouter.get('/get',userAuth , getAuthUserController)

module.exports = userRouter
