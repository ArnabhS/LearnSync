
const { CohereClientV2 } = require('cohere-ai');
const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});
const User = require('../models/userModel.js');
const  questions  = require('../utils/questions.js');

const chatInteraction = async (req, res) => {
    const userId = req.user._id;
    const { message } = req.body;
    // console.log(userId);
    
    const user = await User.findById(userId);
    user.promptsUsed += 1;
  
    let nextQuestions = null;
    if (user.promptsUsed === 3 ) {
      nextQuestions = questions.slice(6, 13);
    }
    if(user.promptsUsed === 6){
      nextQuestions = questions.slice(14, 21);
    }
    const aiResponse = await generateResponse(message, user.detectedDisorders);
  
    await user.save();
  
    res.json({ message: aiResponse, nextQuestions });
  };


const generateResponse = async (message, detectedDisorders) => {
    let disorderPrompt = '';
    if (detectedDisorders.length > 0) {
      disorderPrompt = `The user has been detected with the following disorders: ${detectedDisorders.join(', ')}. `;
    }
  
    const prompt = `${disorderPrompt}Please respond to the user's message with a personalized response that is supportive and understanding. User message: "${message}. In the responses strictly do not mention the disorders. Give the responses in a friendly and healthy manner."`;
  
    const response = await cohere.chat({
      model: 'command-r-plus',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });
  console.log(response);
  
    const aiResponse = response.message?.content?.[0]?.text || 'Sorry, I could not process the request.';
  
    return aiResponse;
  };



module.exports = { chatInteraction }