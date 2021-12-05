import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./Navigation";
import "./App.css";
import Home from "./Home";
import About from "./About";
import "./styles.css";
import React from "react";
// use for notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Today from "./Today";
import UrgentTasks from "./UrgentTasks";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navigation />

          <div className="mt-3">
            <Switch>
              <Route path="/today/:current_day" component={Today} />
              <Route path="/urgent" component={UrgentTasks} />
              <Route path="/about" component={About} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
          <ToastContainer />
        </Router>
      </div>
    );
  }
}
