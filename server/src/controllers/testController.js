const User = require("../models/userModel.js");
const questions = require("../utils/questions.js");
const { analyzeDisorders } = require("../utils/aiService.js");

const submitAnswers = async (req, res) => {
  const userId = req.user._id;
  const { answers } = req.body; // Array of new answers from the frontend
    // console.log(answers)
  // Find the user by ID
  const user = await User.findById(userId);

  // Get the current number of questions the user has already answered
  const currentQuestionsAnswered = user.questionsAnswered;

  // Slice the questions based on how many the user has answered so far
  const questionSlice = questions.slice(
    currentQuestionsAnswered,
    currentQuestionsAnswered + answers.length
  );
  
  // Pair the user's new answers with the respective questions
  const newQuestionAnswerPairs = answers.map((answer, index) => ({
    question: questionSlice[index].question,
    options: questionSlice[index].options,
    answer: answer,
  }));
  console.log(newQuestionAnswerPairs)
  // Retrieve the user's previous answers from the user model
  const previousQuestionAnswerPairs = user.answers.map((answer, index) => ({
    question: questions[index].question, // Map to the question from the question bank
    options: questions[index].options, // Fetch the options
    answer: answer, // Use the stored user's previous answer
  }));

  // Combine previous and new question-answer pairs for analysis
  const combinedQuestionAnswerPairs = [
    ...previousQuestionAnswerPairs,
    ...newQuestionAnswerPairs,
  ];
  console.log(combinedQuestionAnswerPairs)
  // Update the number of questions answered
  user.questionsAnswered += answers.length;

  // Analyze disorders based on combined answers
  const { adhdScore, autismScore, dyslexiaScore } = await analyzeDisorders(
    combinedQuestionAnswerPairs
  );

  // Add detected disorders if the scores exceed the threshold
  if (adhdScore > 5 && !user.detectedDisorders.includes("ADHD")) {
    user.detectedDisorders.push("ADHD");
  }
  if (autismScore > 5 && !user.detectedDisorders.includes("Autism")) {
    user.detectedDisorders.push("Autism");
  }
  if (dyslexiaScore > 5 && !user.detectedDisorders.includes("Dyslexia")) {
    user.detectedDisorders.push("Dyslexia");
  }

  // Update the test results in the user model
  user.testResults = {
    adhdScore: adhdScore,
    autismScore: autismScore,
    dyslexiaScore: dyslexiaScore,
  };

  // Append new answers to the user's existing answers array
  user.answers = [...user.answers, ...answers];

  const totalQuestions = questions.length;
  if (user.questionsAnswered >= totalQuestions) {
    // Remove disorders if their scores are less than 6
    if (adhdScore <= 5 && user.detectedDisorders.includes("ADHD")) {
      user.detectedDisorders = user.detectedDisorders.filter(
        (disorder) => disorder !== "ADHD"
      );
    }
    if (autismScore <= 5 && user.detectedDisorders.includes("Autism")) {
      user.detectedDisorders = user.detectedDisorders.filter(
        (disorder) => disorder !== "Autism"
      );
    }
    if (dyslexiaScore <= 5 && user.detectedDisorders.includes("Dyslexia")) {
      user.detectedDisorders = user.detectedDisorders.filter(
        (disorder) => disorder !== "Dyslexia"
      );
    }
  }
  // Save the updated user information
  await user.save();

  // Send response with updated user and detected disorders
  res.json({ user, detectedDisorders: user.detectedDisorders });
};

module.exports = { submitAnswers };
