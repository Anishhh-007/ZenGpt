const getAuthUserController = (req, res) => {
  try {

    if (!req.data) {
      return res.status(401).json({
        status : false,
        message: "Unauthorized",
      });
    }

    res.status(200).json({
      status:true,
      message: "User data fetched successfully",
      user: req.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status : false,
      message: "Server error",
    });
  }
};

module.exports = { getAuthUserController };
