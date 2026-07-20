const jwt = require("jsonwebtoken");
const Users = require("../models/auth.model");

const auth = (roles) => async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log(token);

    if (!token) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Token not found.",
      });
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    console.log(decodedToken);

    if (!roles.includes(decodedToken?.role)) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "You have not access.",
      });
    }

    const user = await Users.findById(decodedToken?._id);

    if (!user) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "User not found.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error : " + error.message,
    });
  }
};

module.exports = auth;
