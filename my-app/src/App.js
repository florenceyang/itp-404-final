import "bootstrap/dist/css/bootstrap.css";
// new react-router-dom uses Routes instead of Switch
// https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import "./App.css";
import Home from "./Home";
import About from "./About";
import "./styles.css";
import React from "react";
import CreateTaskModal from "./CreateTaskModal";
import WeeklyAgenda from "./WeeklyAgenda";

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
        <h1>HELLLO WEEKLY VIEW</h1>

        {/* add new task form (modal popup) */}
        <button
          type="button"
          onClick={() => {
            this.setState({ isModalOpen: true });
          }}
        >
          New Post
        </button>
        {this.state.isModalOpen && (
          <CreateTaskModal
            title="Add a New Task"
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
            }}
          />
        )}

        <WeeklyAgenda />
      </div>
    );
  }
}
