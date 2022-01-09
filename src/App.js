import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

/* pages */
import Home from "./pages/Home";
import Register from "./pages/Register";
/* components */
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
