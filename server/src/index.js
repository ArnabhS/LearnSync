const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes.js");
const chatBotRoutes = require("./routes/chatbotRoutes.js");
const testRoutes = require("./routes/testRoutes.js");
const app = express();

dotenv.config();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/chat-bot", chatBotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
