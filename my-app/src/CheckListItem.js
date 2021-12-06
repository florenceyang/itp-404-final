import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faInfoCircle,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import TaskDetailsModal from "./TaskDetailsModal";

export default class CheckListItem extends React.Component {
  constructor() {
    super();

    this.state = {
      checked: false,
      isModalOpen: false,
    };
  }
  render() {
    const notDoneColor = "#ddd";
    const doneColor = "green";
    const size = "2x";

    return (
      <>
        <li className="task">
          <FontAwesomeIcon
            data-testid="checkbox-icon"
            icon={faCheckCircle}
            color={this.state.checked ? doneColor : notDoneColor}
            size={size}
            onClick={(event) => {
              this.setState({ checked: !this.state.checked });
              console.log("checked: ", this.state.checked);
            }}
          />
          {/* indicate if task is urgent (bookmarked) or not */}
          {this.props.task.is_bookmarked ? (
            <FontAwesomeIcon
              data-testid="urgent-icon"
              icon={faExclamation}
              color={!this.state.checked ? "red" : notDoneColor}
              size={"2x"}
              onClick={() => {
                this.setState({ isModalOpen: true });
              }}
            />
          ) : (
            ""
          )}
          <span
            className={"task_title " + (this.state.checked ? "slash" : "")}
            data-testid="task-title"
          >
            {this.props.task.title}
          </span>

          <FontAwesomeIcon
            data-testid="info-icon"
            className="info_button"
            icon={faInfoCircle}
            color={"#A0E0F3"}
            size={"2x"}
            onClick={() => {
              this.setState({ isModalOpen: true });
            }}
          />
        </li>
        {this.state.isModalOpen && (
          <TaskDetailsModal
            task={this.props.task}
            title={this.props.task.title}
            // function as a prop = render prop
            details={() => {
              return (
                <div>
                  <p>Do this task on: {this.props.task.to_do_day}</p>
                  <p>Urgent: {this.props.task.is_bookmarked ? "yes" : "no"} </p>
                  <p>Made Urgent on: {this.props.task.time_bookmarked}</p>
                  <p>Task Description: {this.props.task.body} </p>
                </div>
              );
            }}
            // pass closeModal function in so that buttons in Modal.js can call this function to close/hide the modal
            // control rendering thru react instead of html javascript
            onCloseModal={() => {
              this.setState({ isModalOpen: false });
              window.location.reload(false); // refresh to see new API updates
            }}
          />
        )}
      </>
    );
  }
}
