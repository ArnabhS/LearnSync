import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MCQCard({ questions = [] }) {
  // State to track the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  // Handle if questions array is empty
  if (!questions || questions.length === 0) {
    return (
      <div className="text-[#DCECF2] tracking-wider flex justify-center items-center h-[350px]">
        <p>No questions available at the moment.</p>
      </div>
    );
  }

  // Function to handle radio button selection
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Function to handle "Next" button click
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(""); // Reset selected option
    }
  };

  return (
    <div className="text-[#DCECF2] tracking-wider">
      <div className="flex flex-col justify-center items-center">
        <div className="bg-gradient-to-t from-[#09212B99] to-[#1D6F9199] text-[#DCECF2] flex flex-col justify-center items-center w-full max-w-[95%] sm:max-w-[90%] md:max-w-2xl lg:max-w-xl h-[350px] sm:h-[350px] py-8 gap-6 rounded-xl px-4 sm:px-6 m-4 mx-2">
          {/* Scrollable Content within Fixed Card Size */}
          <div className="flex flex-col gap-6 h-full w-full overflow-hidden relative">
            <div className="overflow-y-auto pr-4 hide-scroll-bar max-h-full">
              {/* Current Question */}
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                {questions[currentQuestionIndex].question}
              </h2>

              {/* Options */}
              <div className="flex flex-col gap-4">
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <label
                      key={index}
                      className="flex gap-3 justify-start items-center py-1 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestionIndex}`}
                        value={option}
                        checked={selectedOption === option}
                        onChange={handleOptionChange}
                        className="custom-radio"
                      />
                      <p>{option}</p>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex gap-2 mt-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`flex justify-center items-center rounded-full w-3 h-3 ${
                currentQuestionIndex === index ? "bg-[#1D6F91]" : "bg-[#D9D9D9]"
              }`}
            ></div>
          ))}
        </div>

        {/* Next Button */}
        <div className="flex justify-center mt-12">
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="text-xl bg-gradient-to-r from-[#1D6F91] to-[#3EB1E1] px-6 py-2 rounded-md cursor-pointer"
            >
              Next
            </button>
          ) : (
            <Link to={"/chat"} className="cursor-pointer">
              <button className="text-xl bg-gradient-to-r from-[#1D6F91] to-[#3EB1E1] px-6 py-2 rounded-md">
                Finish
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
