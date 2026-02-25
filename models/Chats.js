const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    chatName: {
        type: String,
        required: true
    },

    messages: [
        {
            isImage: {
                type: Boolean,
                required: true,
            },
            role: {
                type: String,
                enum: {
                    values: ['bot', 'user'],
                    message: '{VALUE} is not a correct gender'
                },
                required: true
            },
            content : {
                type : String,
                required: true
            }
        }
        
    ]
    
} , {timestamps : true})

const chatModel = mongoose.model("Chat" , chatSchema)
module.exports = chatModel