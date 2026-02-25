const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/Users");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Basic validation
    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({
        status: false,
        message: "Email and password are required",
      });
    }

    // normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // 2. Find user (don't reveal which one failed)
    const user = await userModel.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    // 3. Compare password (await the promise!)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    // 4. Create token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    // 5. Send token via cookie (tighter options for production)
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
  
    });

    // 6. Respond
    res.status(200).json({
      status: true,
      message: "User logged in successfully",
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
      status: false,
      message: "Server error",
    });
  }
};

module.exports = { loginController };
