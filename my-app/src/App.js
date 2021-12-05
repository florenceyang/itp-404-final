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
import Modal from "./Modal";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numTasksDone: 0,
      isModalOpen: false,
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

        {/* add new task form (modal popup) */}
        <button
          type="button"
          onClick={() => {
            this.setState({ isModalOpen: true });
            console.log("modal should be open");
          }}
        >
          Open Modal
        </button>
        {this.state.isModalOpen && (
          <Modal
            title="Florence's title"
            // function as a prop = render prop
            body={() => {
              return (
                <div>
                  <p>Modal body text goes here </p>
                  <p>More html inside the body function </p>
                </div>
              );
            }}
            // pass closeModal function in so that buttons in Modal.js can call this function to close/hide the modal
            // control rendering thru react instead of html javascript
            onCloseModal={() => {
              this.setState({ isModalOpen: false });
              console.log("modal should be closed");
            }}
          />
        )}
      </div>
    );
  }
}
