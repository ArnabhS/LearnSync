import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import robotImage from "../assets/Robot.svg";
import { SendHorizonal } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { nanoid } from "nanoid";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { HiSpeakerWave } from "react-icons/hi2";
import { ImVolumeMute2 } from "react-icons/im";

export default function ChatBotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [nextQuestions, setNextQuestions] = useState(null); // To store next questions
  const [showMCQModal, setShowMCQModal] = useState(false); // To control MCQ modal visibility
  const messagesEndRef = useRef(null);

  //listen feature
  const [synth] = useState(window.speechSynthesis);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCardClick = (text) => {
    setInput(text);
  };

  // Function to send messages to the bot and update the chat
  const sendMessage = async (message) => {
    if (message.text.trim() === "") return;

    // Update the messages state to display the user's message
    setMessages((prevMessages) => [...prevMessages, message]);

    try {
      // Send the message to the backend using axios
      const response = await axios.post(
        "http://localhost:5000/api/v1/chat-bot",
        {
          message: message.text,
        },
        { withCredentials: true }
      );

      // Log the response data
      console.log(response.data);

      // Update the messages state with the bot's response
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: nanoid(),
          isUserMessage: false,
          text: response.data.message, // Bot's response
        },
      ]);

      // If there are next questions, handle them accordingly
      if (response.data.nextQuestions) {
        setNextQuestions(response.data.nextQuestions); // Store next questions
        setShowMCQModal(true); // Show the MCQ modal
      }
    } catch (error) {
      console.error("Error in chatbot interaction:", error);
    }

    // Clear the input field and hide the intro section
    setInput(""); // Clear the input after processing the message
    setShowIntro(false); // Hide intro after the first message is sent
  };

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //listen feature
  const speakText = (text) => {
    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      synth.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="p-2 w-[98%] lg:w-[96%] mx-auto mt-2 flex flex-col justify-center">
      <div className="min-h-fit text-white flex flex-col py-2 relative">
        {showIntro && messages.length === 0 && (
          <>
            <div className="mb-6 p-1 flex justify-center">
              <img src={robotImage} alt="Robot" className="h-20 w-20" />
            </div>

            <div className="w-full md:w-[96%] lg:w-[90%] mx-auto p-1 md:p-2 flex justify-between gap-1 space-x-2 text-balance mb-10">
              <div
                className="bg-[#00bfff] bg-opacity-30 p-1 md:p-2 lg:p-4 rounded-lg hover:bg-opacity-50 w-[34.5%] lg:w-[25%] md:w-[25%] transition ease-in-out duration-300 text-sm font-base lg:text-lg md:font-semibold shadow-2xl shadow-[#00FFAE] inset-10"
                onClick={() =>
                  handleCardClick("Your Personalized Learning Companion!")
                }
              >
                <p className="text-center">
                  <span className="text-[#DCECF2]">
                    Your <span className="text-[#00FFAE]">Personalized</span>{" "}
                    Learning <span className="text-[#00FFAE]">Companion!</span>
                  </span>
                </p>
              </div>

              <div
                className="bg-[#00bfff] bg-opacity-30 p-1 md:p-2 lg:p-4 rounded-lg hover:bg-opacity-50 w-[34.5%] md:w-[25%] lg:w-[25%] transition ease-in-out duration-300 text-sm font-base md:font-semibold lg:text-lg shadow-2xl shadow-[#00FFAE] inset-10"
                onClick={() =>
                  handleCardClick(
                    "Where AI Meets Empathy for Meaningful Growth"
                  )
                }
              >
                <p className="text-center">
                  <span className="text-[#DCECF2]">
                    Where <span className="text-[#00FFAE]">AI</span> Meets{" "}
                    <span className="text-[#00FFAE]">Empathy</span> for
                    Meaningful <span className="text-[#00FFAE]">Growth</span>
                  </span>
                </p>
              </div>

              <div
                className="bg-[#00bfff] bg-opacity-30 p-1 md:p-2 lg:p-4 rounded-lg hover:bg-opacity-50 w-[34.5%] md:w-[25%] lg:w-[25%] transition ease-in-out duration-300 text-sm font-base md:font-semibold lg:text-lg shadow-2xl shadow-[#00FFAE] inset-10"
                onClick={() =>
                  handleCardClick("Understanding You, Enhancing Learning")
                }
              >
                <p className="text-center">
                  <span className="text-[#DCECF2]">
                    Understanding <span className="text-[#00FFAE]">You</span>,
                    Enhancing <span className="text-[#00FFAE]">Learning</span>
                  </span>
                </p>
              </div>
            </div>
          </>
        )}

        {/* Message Container */}
        {!showIntro && (
          <div className="h-[75vh] -mt-2 rounded-lg overflow-y-auto">
            <div className="w-[90%] md:w-[60%] mx-auto space-y-4 flex-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.isUserMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg md:text-lg text-sm ${
                      msg.isUserMessage
                        ? "bg-[#5E808DB5] text-gray-300"
                        : "bg-stone-800 text-wrap z-10 text-cyan-100 tracking-wider"
                    } max-w-[70%] flex flex-col`} // Use flex-col for vertical alignment
                  >
                    {/* Message content */}
                    <div className="flex-1">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>
                    </div>

                    {/* "Listen" button aligned at the bottom */}
                    {!msg.isUserMessage && (
                      <button
                        className="mt-2 self-end text-sm text-blue-400 underline"
                        onClick={() => speakText(msg.text)}
                      >
                        {isSpeaking ? <ImVolumeMute2 /> : <HiSpeakerWave />}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center bg-[#060E12]">
          <div className="flex w-[90%] md:w-[60%] mx-auto rounded-lg mb-4 bg-[#5E808DB5]">
            <TextareaAutosize
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  const message = {
                    id: nanoid(),
                    isUserMessage: true,
                    text: input,
                  };
                  sendMessage(message);
                }
              }}
              minRows={1}
              placeholder="Ask"
              className="w-full bg-transparent text-gray-300 p-4 rounded-lg border-none focus:outline-none"
            />

            <button
              className="relative right-2 p-2"
              onClick={() =>
                sendMessage({ id: nanoid(), isUserMessage: true, text: input })
              }
            >
              <SendHorizonal className="text-[#060E12]" />
            </button>
          </div>
        </div>
      </div>

      {/* Assessment Modal */}
      {showMCQModal && nextQuestions && (
        <div className=" w-full h-screen  fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-stone-100 md:px-8 p-6 rounded-lg max-w-md shadow-lg filter drop-shadow-lg relative w-[90%] md:w-full">
            <h2 className="text-xl font-bold mb-4">Personalized Assessment</h2>
            <p className="mb-6">
              To continue, please take the assessment to get more personalized
              responses.
            </p>
            <Link
              to="/questions"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}