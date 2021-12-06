import React from "react";
import CreateTaskModal from "./CreateTaskModal";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import TaskGroup from "./TaskGroup";

export default class Tomorrow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      day_index: 0,
    };
  }

  componentDidMount() {
    // shift days array to reflect "tomorrow" days according to index
    const tomorrow_days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    this.setState({
      // grab the current day from the url parameter
      day_index: this.props.match.params.current_day,
    });

    document.title = `Tomorrow's tasks (${
      tomorrow_days[this.state.day_index]
    })`;
  }

  render() {
    // shift days array to reflect "tomorrow" days according to index
    const tomorrow_days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return (
      <div>
        <h1 className="page_header" data-testid="tomorrow-pg-header">
          🔮 Tomorrow looks like:
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
            // pass closeModal function in so that buttons in Modal.js can call this function to close/hide the modal
            // control rendering thru react instead of html javascript
            onCloseModal={() => {
              this.setState({ isModalOpen: false });

              // refresh code referenced: https://upmostly.com/tutorials/how-to-refresh-a-page-or-component-in-react
              window.location.reload(false); // refresh to see new API updates
            }}
          />
        )}

        {/* ONLY SHOW 1 DAY'S (TODAY'S) TASKS */}
        <h1 className="header_day" data-testid="tomorrow-header">
          {tomorrow_days[this.state.day_index]}
        </h1>
        <TaskGroup
          filter={"to_do_day=" + tomorrow_days[this.state.day_index]}
        />
      </div>
    );
  }
}
