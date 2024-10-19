const jwt = require("jsonwebtoken");

const User = require("../models/userModel.js");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, Please login");
  }
  try {
    // console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
};

module.exports = { verifyToken };
