import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Logout from "./components/Logout";
import Chat from "./pages/Chat/Chat";
import Fitness from "./pages/Fitness/Fitness";
import ClientProfile from "./pages/Client/ClientProfile";
import Planner from "./pages/Planner/Planner";
import Navbar from "./components/Navbar/Navbar";
import ProfileList from "./components/Contacts/ProfileList";
import TrainerProfile from "./pages/TrainerProfile/TrainerProfile";
import FitnessChallenges from "./pages/FitChallenge/FitnessChallenges";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle between light mode and dark mode
  const toggleMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    // Save the mode preference to local storage for persistence
    localStorage.setItem('isDarkMode', JSON.stringify(newMode));
  };

  
  useEffect(() => {
    const savedMode = JSON.parse(localStorage.getItem('isDarkMode'));
    if (savedMode !== null) {
      setIsDarkMode(savedMode);
    }
  }, []);

  // Apply dark mode styles if enabled
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]); 

  return (
    <main>
      <Navbar toggleMode={toggleMode} isDarkMode={isDarkMode} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<Main />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/fitness" element={<Fitness />} />
        <Route path="/clients" element={<ClientProfile />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/contacts" element={<ProfileList />} />
        <Route path="/trainer-profile" element={<TrainerProfile />} />
        <Route path="/challenges" element={<FitnessChallenges />} />
      </Routes>
    </main>
  );
}

export default App;
