import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./Navigation";
import "./App.css";
import Home from "./Home";
import "./styles.css";
import React from "react";
// use for notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Today from "./Today";
import UrgentTasks from "./UrgentTasks";
import Tomorrow from "./Tomorrow";
import Error404 from "./Error404";

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
              <Route exact path="/today/:current_day" component={Today} />
              <Route exact path="/tomorrow/:current_day" component={Tomorrow} />
              <Route exact path="/urgent" component={UrgentTasks} />
              <Route exact path="/" component={Home} />
              {/* catch all for routes that don't exist --> 404 error */}
              {/* referenced: https://v5.reactrouter.com/web/example/no-match*/}
              <Route path="/*" component={Error404} />
            </Switch>
          </div>
          <ToastContainer />
        </Router>
      </div>
    );
  }
}
