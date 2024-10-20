import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import toast from "react-hot-toast";
import Logo from "../assets/Logo.png"; // Importing the image

export default function Header() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Success", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    navigate("/login");
  };

  return (
    <div className="mt-4 mb-2 w-[98%] lg:w-[96%] mx-auto flex items-center justify-between">
      <Link
        to={"/"}
        className="flex items-center text-white font-bold text-lg leading-6 lg:text-2xl"
      >
        <img src={Logo} alt="Logo" className="w-auto h-14" />
        LearnSync
      </Link>

      {token ? (
        <button
          onClick={handleLogout}
          className="w-[20%] md:w-[12%] lg:w-[8%] py-1 lg:py-1 rounded-lg bg-gradient-to-r from-[#E28C8C] to-[#912D1D] text-white flex items-center justify-center text-sm lg:text-lg"
        >
          Logout
        </button>
      ) : (
        <Link
          to={"/login"}
          className="w-[20%] md:w-[12%] lg:w-[8%] py-1 lg:py-1 rounded-lg bg-gradient-to-r from-[#8CC9E2] to-[#1D6F91] text-white flex items-center justify-center text-sm lg:text-lg"
        >
          Login
        </Link>
      )}
    </div>
  );
}
