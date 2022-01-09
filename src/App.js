import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

/* pages */
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
/* components */
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
