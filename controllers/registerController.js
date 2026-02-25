const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/Users");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate
    if (!name || !email || !password) {
      return res.status(400).json({
        status : false,
        message: "All fields are required",
      });
    }

    // 2. Check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status : false,
        message: "User already exists",
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5. Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    // 6. Send token via cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      status:true,
      message : 'User register successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        tokens : user.tokens
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status:false,
      message: "Server error",
    });
  }
};

module.exports = { registerController };
