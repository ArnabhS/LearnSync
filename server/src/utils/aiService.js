const { CohereClientV2 } = require('cohere-ai');
const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

const analyzeDisorders = async (questionAnswerPairs) => {
  
  const inputs = questionAnswerPairs.map(
    pair => `Question: ${pair.question} | Options: ${pair.options.join(' | ')} | Answer: ${pair.answer}`
  );
  console.log(inputs ,"input")
  const prompt = `
    For each response, provide a score between 1 to 10 for ADHD, Autism, and Dyslexia based on the user's answers:
    ${inputs.join('\n')}
    Respond in the format:
    ADHD: [Score]
    Autism: [Score]
    Dyslexia: [Score]
  `;

  const response = await cohere.chat({
    model: 'command-r-plus',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

 
  const aiResponse = response.message?.content?.[0]?.text; 
  const scores = {
    adhdScore: extractScore(aiResponse, 'ADHD'),
    autismScore: extractScore(aiResponse, 'Autism'),
    dyslexiaScore: extractScore(aiResponse, 'Dyslexia'),
  };
  console.log(scores)
  return scores;
};

// Helper function to extract scores from AI response
const extractScore = (response, disorder) => {
  const regex = new RegExp(`${disorder}:\\s*(\\d+)`, 'i');
  const match = response.match(regex);
  return match ? parseInt(match[1], 10) : 0;
};

module.exports = { analyzeDisorders };