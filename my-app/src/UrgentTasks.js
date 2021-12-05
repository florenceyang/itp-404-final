import React from "react";
import CreateTaskModal from "./CreateTaskModal";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import TaskGroup from "./TaskGroup";

export default class UrgentTasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      bookmark_filter: "",
    };
  }

  componentDidMount() {
    this.setState({
      // grab the current day from the url parameter
      bookmark_filter: this.props.match.params.filter,
    });
  }

  render() {
    return (
      <div>
        <h1>URGENT TASKS VIEW</h1>
        {/* add new task form (modal popup) */}
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            this.setState({ isModalOpen: true });
          }}
        >
          Add Task
        </button>
        {this.state.isModalOpen && (
          <CreateTaskModal
            title="Add a New Task"
            // pass closeModal function in so that buttons in Modal.js can call this function to close/hide the modal
            // control rendering thru react instead of html javascript
            onCloseModal={(is_toast_success, toast_message) => {
              this.setState({ isModalOpen: false });
              // refresh code referenced: https://upmostly.com/tutorials/how-to-refresh-a-page-or-component-in-react
              window.location.reload(false); // refresh to see new API updates
            }}
          />
        )}

        {/* ONLY SHOW 1 DAY'S (TODAY'S) TASKS */}
        <h1 className="header_day">Urgent Tasks</h1>
        <TaskGroup filter="is_bookmarked=true" />
      </div>
    );
  }
}
