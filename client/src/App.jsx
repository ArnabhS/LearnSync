import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./const/Layout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ChatBotPage from "./pages/ChatBotPage";
import Question from "./pages/Question";
import { useSelector } from "react-redux";

function App() {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) return <div>Loading...</div>;
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={user ? <ChatBotPage /> : <Login />} />
          <Route path="/questions" element={<Question />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
