import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Questions() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/auth/get-questions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        // console.log(data);
        setQuestions(data.newQuestions || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to load questions.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Handle radio button selection
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Handle "Next" button click
  const handleNextQuestion = () => {
    // If no option is selected, show an alert
    if (!selectedOption) {
      toast.error("Please choose an option first.", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    const currentAnswer = selectedOption[0]; // Extract the first letter (A, B, C, or D)
    setAnswers((prevAnswers) => [...prevAnswers, currentAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(""); // Reset selected option for the next question
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // If no option is selected, show an alert
    if (!selectedOption) {
      alert("Please choose an option first.");
      return;
    }

    const finalAnswer = selectedOption[0];
    const finalAnswersArray = [...answers, finalAnswer];
    // console.log(finalAnswersArray);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/test/submit-answers`,
        { answers: finalAnswersArray },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Answers submitted successfully:", response.data);
      navigate("/chat"); // Use navigate to redirect
    } catch (error) {
      console.error("Error submitting answers:", error);
      setError("Failed to submit answers.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-[#DCECF2] tracking-wider flex justify-center items-center h-[350px]">
        <p>Loading questions...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-[#DCECF2] tracking-wider flex justify-center items-center h-[350px]">
        <p>{error}</p>
      </div>
    );
  }

  // Handle if no questions available
  if (!questions || questions.length === 0) {
    return (
      <div className="text-[#DCECF2] tracking-wider flex justify-center items-center h-[350px]">
        <p>No questions available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="text-[#DCECF2] tracking-wider">
      <div className="flex flex-col justify-center items-center">
        <div className="bg-gradient-to-t from-[#09212B99] to-[#1D6F9199] text-[#DCECF2] flex flex-col justify-center items-center w-full max-w-[95%] sm:max-w-[90%] md:max-w-2xl lg:max-w-xl h-[350px] sm:h-[350px] py-8 gap-6 rounded-xl px-4 sm:px-6 m-4 mx-2">
          <div className="flex flex-col gap-6 h-full w-full overflow-hidden relative">
            <div className="overflow-y-auto pr-4 hide-scroll-bar max-h-full">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                {questions[currentQuestionIndex].question}
              </h2>

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
            <button
              onClick={handleSubmit}
              className="text-xl bg-gradient-to-r from-[#1D6F91] to-[#3EB1E1] px-6 py-2 rounded-md cursor-pointer"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
