const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password: { 
        type: String, 
        required: true 
    },
    loginCount: { 
        type: Number, 
        default: 0 
    },
    promptsUsed: { 
        type: Number, 
        default: 0 
    },  
    questionsAnswered: { 
        type: Number, 
        default: 0 
    },  
    testResults: {
      adhdScore: { 
        type: Number, 
        default: 0 
    },
      autismScore: { 
        type: Number, 
        default: 0 
    },
      dyslexiaScore: {
        type: Number, 
        default: 0 
    },
    },
    detectedDisorders: [{ type: String }],  
    answers: [{ 
        type: String 
    }],  
    dateTaken: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema);