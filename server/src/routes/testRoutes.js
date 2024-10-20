const express = require("express");
const { submitAnswers } = require("../controllers/testController.js");
const { verifyToken } = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/submit-answers", verifyToken, submitAnswers);

module.exports = router;
