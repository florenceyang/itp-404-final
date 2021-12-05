import "bootstrap/dist/css/bootstrap.css";
// new react-router-dom uses Routes instead of Switch
// https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import "./App.css";
import Home from "./Home";
import About from "./About";
import CheckList from "./CheckList";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      numTasksDone: 0,
    };
  }

  render() {
    return (
      <div className="App">
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

        <h1># of Tasks Completed: {this.state.numTasksDone} </h1>
        {/* checklist with green completed checkmarks and strikethrough */}
        <CheckList
          onTaskClick={(updatedTasks) => {
            console.log("updatedTasks: ", updatedTasks);
            this.setState({
              numTasksDone: this.state.numTasksDone + updatedTasks,
            });
          }}
          renderEmptyTask={(onClick) => {
            return (
              <li className="task">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  color="#ddd"
                  size={"2x"}
                  onClick={onClick}
                />
                <input type="text"></input>
              </li>
            );
          }}
          renderDoneTask={(onClick) => {
            return (
              <li className="task">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  color="green"
                  size={"2x"}
                  onClick={onClick}
                />
                <input type="text" className="slash"></input>
              </li>
            );
          }}
        />
        <button>New Post</button>
      </div>
    );
  }
}
