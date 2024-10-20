const User = require("../models/userModel.js");
const questions = require("../utils/questions.js");

const getQuestions = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // console.log(user);

    if (!user) {
      return res.status(404).json("User not found");
    }

    let newQuestions = null;
    if (user.loginCount == 1) {
      newQuestions = questions.slice(0, 5);
      user.loginCount += 1;
    }
    if (user.promptsUsed == 3) {
      newQuestions = questions.slice(5, 13);
    }
    if (user.promptsUsed == 6) {
      newQuestions = questions.slice(13, 21);
    }

    return res.status(200).json({
      newQuestions,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Intenal Server Error");
  }
};

module.exports = { getQuestions };
