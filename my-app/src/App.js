import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import "./App.css";
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <div className="container">
      <Router>
        <Navigation />

        <div className="mt-3">
          <Routes>
            <Route path="/about" element={About} />
            <Route path="/" element={Home} />
          </Routes>
        </div>
      </Router>
      <h1>HELLLO</h1>
    </div>
  );
}

export default App;
