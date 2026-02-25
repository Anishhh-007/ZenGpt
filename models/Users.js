const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email: String,
    password : String,
    tokens:{type : Number , default:20}

})

const userModel = mongoose.model('User' , userSchema)
module.exports = userModel