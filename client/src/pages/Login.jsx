import React, { useState } from "react";
import { IoMail } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import Questions from "./Question";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, firstLoginQuestions } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    // console.log(result);
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Log In Success", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      // Redirect to home if no questions, otherwise show the MCQCard
      if (result.payload.firstLoginQuestions?.length > 0) {
        navigate("/questions"); // Optional: redirect to a new route for the questions
      } else {
        navigate("/"); // Go to homepage if no questions
      }
    }
  };

  // Optionally render the questions in the same component if user is logged in and has firstLoginQuestions
  if (firstLoginQuestions?.length > 0) {
    // console.log(firstLoginQuestions);
    return <Questions questions={firstLoginQuestions} />;
  }

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen">
      <div className="relative">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-[#3EB1E1] rounded-full blur-3xl opacity-45 z-0"></div>
        <div className="relative z-10">
          <div className="bg-gradient-to-t from-[#09212B99] to-[#1D6F9199] text-[#DCECF2] flex flex-col justify-center items-center md:max-w-2xl h-[450px] gap-5 rounded-xl px-14 m-4">
            <h2 className="text-4xl text-center mb-8 font-semibold tracking-wide">
              Welcome Back
            </h2>
            {error && (
              <p className="text-red-500 text-center mb-2">{error.message}</p>
            )}
            <div className="bg-[#D9D9D9] flex flex-row items-center gap-2 px-2 py-1 rounded-md w-full">
              <IoMail className="text-[#5B5B5B] text-2xl" />
              <input
                className="bg-[#D9D9D9] outline-none text-[#5B5B5B] w-full p-1"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="bg-[#D9D9D9] flex flex-row items-center gap-2 px-2 py-1 rounded-md w-full">
              <IoIosLock className="text-[#5B5B5B] text-2xl" />
              <input
                className="bg-[#D9D9D9] outline-none text-[#5B5B5B] w-full p-1"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-[#1D6F91] to-[#3EB1E1] px-4 py-1 rounded-md"
            >
              Login
            </button>
            <p className="tracking-wide text-center">
              <span className="italic text-xs text-[#D9D9D9] hover:text-[#878787]">
                Don&apos;t have an account?
              </span>
              <Link to={"/signup"} className="text-[#3EB1E1] cursor-pointer">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
