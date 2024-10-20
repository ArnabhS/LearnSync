import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import robotImage from "../assets/Robot.svg";
import { SendHorizonal } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { nanoid } from "nanoid";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";
import { HiSpeakerWave } from "react-icons/hi2";
import { ImVolumeMute2 } from "react-icons/im";
import { useSelector } from "react-redux";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ChatBotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [nextQuestions, setNextQuestions] = useState(null);
  const [showMCQModal, setShowMCQModal] = useState(false);
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false); // Loading state

  const token = useSelector((state) => state.auth.token);

  // Listen feature
  const [synth] = useState(window.speechSynthesis);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCardClick = (text) => {
    setInput(text);
  };

  // Function to send messages to the bot and update the chat
  const sendMessage = async (message) => {
    if (message.text.trim() === "") return;
    setInput("");

    setMessages((prevMessages) => [...prevMessages, message]);
    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/chat-bot`,
        { message: message.text },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Make sure `token` is defined and valid
          },
        }
      );

      // console.log(response.data);

      setMessages((prevMessages) => [
        ...prevMessages,
        { id: nanoid(), isUserMessage: false, text: response.data.message },
      ]);

      if (response.data.nextQuestions) {
        setNextQuestions(response.data.nextQuestions);
        setShowMCQModal(true);
      }
    } catch (error) {
      console.error("Error in chatbot interaction:", error);
    } finally {
      setLoading(false); // Stop loading
    }

    setInput("");
    setShowIntro(false);
  };

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listen feature
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

            <div className="w-full md:w-[96%] lg:w-[90%] mx-auto p-1 md:p-2 flex justify-between gap-1 space-x-2 mb-10">
              {[
                "What's git and github?",
                "In short define force",
                "What is gravity?",
              ].map((text) => (
                <div
                  key={text}
                  className="bg-[#00bfff] bg-opacity-30 p-4 rounded-lg hover:bg-opacity-50 w-[34.5%] transition duration-300 text-lg shadow-2xl shadow-[#00FFAE] cursor-pointer"
                  onClick={() => handleCardClick(text)}
                >
                  <p className="text-center text-[#DCECF2]">{text}</p>
                </div>
              ))}
            </div>
          </>
        )}

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
                    className={`p-3 rounded-lg text-sm max-w-[70%] ${
                      msg.isUserMessage
                        ? "bg-[#5E808DB5] text-gray-300"
                        : "bg-stone-800 text-cyan-100"
                    } flex flex-col`}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>

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

              {loading && (
                <div className="text-center text-white">Generating...</div>
              )}

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
                  sendMessage({
                    id: nanoid(),
                    isUserMessage: true,
                    text: input,
                  });
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

      {showMCQModal && nextQuestions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-stone-100 p-6 rounded-lg max-w-md shadow-lg w-[90%]">
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
