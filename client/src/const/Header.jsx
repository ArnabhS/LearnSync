import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="mt-4 mb-2 w-[98%] lg:w-[96%] mx-auto flex items-center justify-between">
      <Link
        to={"/"}
        className="text-white font-bold text-lg leading-6 lg:text-2xl"
      >
        LearnSync
      </Link>

      {user ? (
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
