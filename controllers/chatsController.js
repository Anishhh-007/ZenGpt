const chatModel = require("../models/Chats");

/**
 * Create a new chat
 */
const createChats = async (req, res) => {
  try {
    const user = req.data;
    const chat = await chatModel.create({
      userID: user._id,
      chatName: "New Chat",
      messages: []
    });

    const newChats = await chatModel.find({userID : user._id}) 

    res.status(201).json({
      message: "Chat created successfully",
      status: true,
      data: newChats
    });
  } catch (error) {
    console.log('ya ho kuro birgya')
    res.status(500).json({
      message: error.message,
      status: false
    });
  }
};

/**
 * Get all chats of a user
 */
const getChats = async (req, res) => {
  try {
    const user = req.data;

    const chats = await chatModel.find({ userID: user._id });

    res.status(200).json({
      message: "Chats fetched successfully",
      status: true,
      data: chats
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false
    });
  }
};


const deleteChats = async (req, res) => {
  try {
    const {chatID} = req.params;
    const user = req.data;

    await chatModel.findOneAndDelete({ userID: user._id  , _id : chatID});
    const remainingChats = await chatModel.find({userID : user._id})
console.log(remainingChats)
    res.status(200).json({
      message: "Chats deleted successfully",
      success: true,
      data : remainingChats
    });
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

module.exports = { createChats, getChats, deleteChats };
