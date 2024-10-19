const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware.js");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} = require("../controllers/authController.js");
// const { getQuestions } = require('../controllers/questionController.js')

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyToken, logoutUser);
router.get("/me",  getUser);
// router.get("/get-questions", verifyToken, getQuestions);
module.exports = router;
