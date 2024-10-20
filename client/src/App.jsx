import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./const/Layout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ChatBotPage from "./pages/ChatBotPage";
import Question from "./pages/Question";
import { useDispatch, useSelector } from "react-redux";
import Signup from "./pages/Signup";
import { checkUserSession } from "./redux/authSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(checkUserSession()); // Load user data when the app starts
    }
  }, [dispatch, token]);
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={token ? <ChatBotPage /> : <Login />} />
          <Route path="/questions" element={<Question />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
