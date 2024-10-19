
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


export default function LandingPage() {
  return (
    <div className="  p-2 w-[98%] lg:w-[96%]  mx-auto mt-2 flex flex-col flex-1 justify-center  ">
      <div className=" flex items-center justify-center ">
        <div className="relative  w-[90%] lg:w-[65%]  mt-4 md:mt-12 lg:mt-12  h-fit text-wrap  ">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-[#8CC9E2] rounded-full blur-3xl opacity-45 z-0"></div>

          <h1 className="relative w-fit  text-center  font-bold !leading-snug tracking-widest text-[#DCECF2] text-3xl md:text-5xl lg:text-6xl mb-12">
            An AI{" "}
            <span className="bg-gradient-to-r from-[#8CC9E2] to-[#3EB1E1] bg-clip-text text-transparent">
              Companion
            </span>{" "}
            That Understands You, So You Can Learn{" "}
            <span className="bg-gradient-to-r from-[#8CC9E2] to-[#3EB1E1] bg-clip-text text-transparent">
              {" "}
              Smarter!
            </span>
          </h1>

          <div className=" flex justify-center">
            <Link
              to={"/chat"}
              className=" flex bg-gradient-to-r from-[#1D6F91] to-[#3EB1E1] p-2 w-[50%] md:w-[36%] lg:w-[26%] rounded-xl text-sm md:text-base lg:text-xl text-white justify-center items-center z-10"
            >
              {" "}
              Start asking{" "}
              <MoveRight size={20} className=" block md:hidden ml-2" />
              <MoveRight size={30} className=" md:block hidden ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <div className="overflow-hidden w-[96%] mx-auto mt-6 md:mt-14 lg:mt-14 mb-8">
        <motion.div
          className="flex justify-between items-center text-[#00FFAE] p-1 w-max text-xs lg:text-base leading-6"
          initial={{ x: 0 }} // Ensure the text is visible immediately
          animate={{ x: ["0%", "-100%"] }} // Start moving the text from the visible position
          transition={{
            repeat: Infinity,
            duration: 50, // Speed for smooth scrolling
            ease: "linear",
            delay: 1, // Small delay after page load if needed
          }}
          whileHover={{ x: 0 }} // Pause on hover
        >``
          <div className="mx-10">Your Personalized Learning Companion!</div>
          <div className="mx-10">
            Where AI Meets Empathy for Meaningful Growth
          </div>
          <div className="mx-10">Understanding You, Enhancing Learning</div>
          <div className="mx-10">Your Personalized Learning Companion!</div>
          {/* Repeat for smoothness */}
          <div className="mx-10">
            Where AI Meets Empathy for Meaningful Growth
          </div>
          <div className="mx-10">Understanding You, Enhancing Learning</div>
          <div className="mx-10">Your Personalized Learning Companion!</div>
          <div className="mx-10">
            Where AI Meets Empathy for Meaningful Growth
          </div>
          <div className="mx-10">Understanding You, Enhancing Learning</div>
        </motion.div>
      </div>

      <div className="  text-[#DCECF2] mt-0 md:mt-10 lg:mt-16 p-4 w-[98%] md:w-[84%] lg:w-[60%] mx-auto flex flex-col justify-center items-center mb-24">
        <h1 className=" text-xl font-semibold md:text-4xl lg:text-5xl mb-3 p-2 lg:p-4">
          What we want to{" "}
          <span className=" bg-gradient-to-r from-[#8CC9E2] to-[#3EB1E1] bg-clip-text text-transparent">
            Achieve!
          </span>{" "}
        </h1>
        <p className=" text-md md:text-xl lg:text-2xl p-2 lg:p-4 text-left md:text-center leading-loose font-medium relative left-2 md:left-0 md:block italic">
          Our aim is to provide an{" "}
          <span className=" text-[#3EB1E1]">adaptive</span> learning experience
          tailored to each individual&apos;s unique strengths and needs. Through
          engaging conversations and{" "}
          <span className=" text-[#3EB1E1]">personalized</span> insights, we
          help users explore their potential, making learning enjoyable,
          effective, and meaningful. With AI at the core, we create a{" "}
          <span className=" text-[#3EB1E1]">supportive</span> environment where
          every learner can grow at their own pace!
        </p>
      </div>

      

      
    </div>
  );
}