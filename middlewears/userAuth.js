const jwt = require("jsonwebtoken");
const userModel = require("../models/Users");

const userAuth = async (req, res, next) => {
  try {
    // 1. Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        status : false,
        message: "Authentication token missing",
      });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // 3. Find user
    const user = await userModel
      .findById(decoded.userId)
      .select("-password");

    if (!user) {
      return res.status(401).json({
        status : false,
        message: "User not found",
      });
    }

    // 4. Attach user info
    req.data =  user ;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      status : false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = {userAuth} ;
