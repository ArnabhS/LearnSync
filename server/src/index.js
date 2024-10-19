const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes.js')

const app = express();

dotenv.config();

connectDB();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
  }));
  
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth',authRoutes)
// 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));