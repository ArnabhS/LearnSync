const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware.js");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/authController.js");
const { getQuestions } = require("../controllers/questionController.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getUser);
router.get("/get-questions", verifyToken, getQuestions);
module.exports = router;
