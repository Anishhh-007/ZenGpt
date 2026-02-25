const chatModel = require("../models/Chats")
const userModel = require("../models/Users")
const openai = require("../configs/gemini.js")
const imagekit = require("../configs/imagekit.js")
const axios = require("axios")
const ImageKit = require('@imagekit/nodejs')



const textController = async (req, res) => {
    try {
        const user = req.data
        if (user.tokens < 1) {
            return res.json({ status: false, message: "Not enouth tokens available" })
        }
        const { chatID, prompt } = req.body
        const chat = await chatModel.findOne({ _id: chatID, userID: user._id })
        chat.messages.push({ role: "user", content: prompt, isImage: false })

        const { choices } = await openai.chat.completions.create({
            model: "gemini-3-flash-preview",
            messages: [

                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        const reply = { content: choices[0].message.content, isImage: false, role: "bot" }

        chat.messages.push(reply)
        await chat.save()

        res.json({ status: true, message: reply })        

        await userModel.updateOne({ _id: user._id }, { $inc: { tokens: - 1 } })
    } catch (error) {
        res.json({ status: false, messages: error.message })

    }
}



const imageController = async (req, res) => {
    try {
        const user = req.data;
        if (user.tokens < 2) {
            return res.json({ status: false, message: "Not enough tokens available" });
        }

        const { chatID, prompt } = req.body;
        const encodedPrompt = encodeURIComponent(prompt);

        const generateImgUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/zengpt/${Date.now()}.png?tr=w-800,h-900`

        const uploadImage = await imagekit.upload({
            file: generateImgUrl,
            fileName: `img-${Date.now()}.png`,
            folder: "zengpt"
        });

        // 4. Update Database
        await userModel.findOneAndUpdate({ _id: user._id }, { $inc: { tokens: -2 } });

        const reply = {
            content: uploadImage.url,
            isImage: true,
            role: "bot"
        };

        const chat = await chatModel.findOne({ _id: chatID, userID: user._id });
        if (chat) {
            chat.messages.push({ role: "user", isImage: false, content: prompt });
            chat.messages.push(reply);
            await chat.save();
        }

        return res.json({ status: true, message: reply });

    } catch (error) {
        return res.json({ status: false, messages: "Failed to generate or upload: " + error.message });
    }
};
module.exports = { textController, imageController }