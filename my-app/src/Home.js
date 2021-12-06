import React from "react";
import CreateTaskModal from "./CreateTaskModal";
import WeeklyAgenda from "./WeeklyAgenda";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }

  componentDidMount() {
    document.title = "This Week's Agenda";
  }
  render() {
    return (
      <div>
        <h1 className="page_header" data-testid="home-pg-header">
          🚀 Your week looks like:
        </h1>
        {/* add new task form (modal popup) */}
        <button
          data-testid="add-task-button"
          type="button"
          className="btn btn-success add_button"
          onClick={() => {
            this.setState({ isModalOpen: true });
          }}
        >
          Add Task
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
              // refresh code referenced: https://upmostly.com/tutorials/how-to-refresh-a-page-or-component-in-react
              window.location.reload(false); // refresh to see new API updates
            }}
          />
        )}
        <WeeklyAgenda />
      </div>
    );
  }
}
