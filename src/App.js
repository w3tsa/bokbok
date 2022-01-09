import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

/* pages */
import Home from "./pages/Home";
/* components */

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
