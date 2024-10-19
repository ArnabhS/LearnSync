const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware.js')
const { chatInteraction } = require('../controllers/chatbotController.js')
const router = express.Router();

router.post('/', verifyToken , chatInteraction );

module.exports = router;