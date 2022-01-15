import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/auth";
import "./App.css";

import { useState, useEffect } from "react";
/* pages */
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import Profile from "./pages/Profile";
import Theme from "./components/Theme";

/* local imports components */
import Navbar from "./components/Navbar";

function App() {
  const storedTheme = localStorage.getItem("DARK_MODE");
  const [darkMode, setDarkMode] = useState(storedTheme);

  const toggleDarkButton = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("DARK_MODE", darkMode);
  }, [darkMode]);
  return (
    <AuthProvider>
      <Theme darkMode={darkMode}>
        <Router>
          <Navbar darkMode={darkMode} toggleDarkButton={toggleDarkButton} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </Theme>
    </AuthProvider>
  );
}

export default App;
