import React from "react";
import ReactDom from "react-dom";
import { toast } from "react-toastify"; // use for notifications

export default class TaskDetailsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      to_do_day: "",
      is_urgent: false,
      is_editing: false,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.toggleUrgentCheck = this.toggleUrgentCheck.bind(this);
    this.handleDaySelect = this.handleDaySelect.bind(this);
  }

  componentDidMount() {
    // this prepopulates our edit form with the original values
    this.setState({
      title: this.props.task.title,
      body: this.props.task.body,
      to_do_day: this.props.task.to_do_day,
      is_urgent: this.props.task.is_bookmarked,
    });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }
  handleBodyChange(event) {
    this.setState({ body: event.target.value });
  }
  handleDaySelect(event) {
    this.setState({ to_do_day: event.target.value });
  }
  toggleUrgentCheck(event) {
    this.setState({ is_urgent: event.target.checked });
  }

  handleSubmit(event) {
    event.preventDefault();
    const id = this.props.task.id;
    // PUT REQUEST
    fetch(`https://itp404-final-server.herokuapp.com/api/tasks/${id}`, {
      method: "PUT",

      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body,
        is_bookmarked: this.state.is_urgent,
        time_bookmarked: this.state.is_urgent ? Date().toLocaleString() : "",
        to_do_day: this.state.to_do_day,
      }),
      headers: {
        // telling it that we're sending JSON in this request
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        // receive what we posted/inserted back in object form
        return response.json();
      })
      .then((json) => {
        console.log(json);
        toast.success(`Task "${json.title} was successfully updated`);
        // close modal to go back to home page
        this.setState({ is_editing: false });
      });
  }

  render() {
    // from public/index.html
    const modalContainer = document.getElementById("modal-container");

    // React portal lets us choose where we want component to be rendered
    // i.e. outside the element that it's declared in
    // createPortal(what should be rendered, where it should be rendered)

    return ReactDom.createPortal(
      <div className="modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.state.title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={this.props.onCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              {/* either show the edit task form or the task details in the modal */}
              {this.state.is_editing ? (
                <form
                  onSubmit={(event) => {
                    this.handleSubmit(event);
                  }}
                >
                  <div className="my-3">
                    <label htmlFor="title" className="form-label">
                      Task Title
                    </label>
                    <input
                      id="title"
                      className="form-control"
                      value={this.state.title}
                      onChange={this.handleTitleChange}
                    />
                  </div>
                  <div className="my-3">
                    <label htmlFor="body" className="form-label">
                      Task Description
                    </label>
                    <textarea
                      id="body"
                      className="form-control"
                      value={this.state.body}
                      onChange={(event) => {
                        this.handleBodyChange(event);
                      }}
                    ></textarea>
                  </div>
                  <div className="mb-3 mt-3">
                    <label className="form-label" htmlFor="day_select">
                      Do this task on:
                    </label>
                    <select
                      className="form-select"
                      id="day_select"
                      value={this.state.to_do_day}
                      onChange={this.handleDaySelect}
                    >
                      <option>--Select a Day--</option>
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Saturday</option>
                      <option>Sunday</option>
                    </select>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="urgent-check"
                      checked={this.state.is_urgent}
                      onChange={this.toggleUrgentCheck}
                    />
                    <label htmlFor="urgent-check">This is urgent!!</label>
                  </div>
                </form>
              ) : (
                <div>
                  <p>Do this task on: {this.state.to_do_day}</p>
                  <p>Urgent: {this.state.is_bookmarked ? "yes" : "no"} </p>
                  <p>Made Urgent on: {this.state.time_bookmarked}</p>
                  <p>Task Description: {this.state.body} </p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              {this.state.is_editing ? (
                <>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(event) => {
                      this.handleSubmit(event);
                    }}
                  >
                    Update Task
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      this.setState({ is_editing: false });
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => {
                      this.setState({ is_editing: true });
                    }}
                  >
                    Edit Task
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.props.onCloseModal}
                  >
                    Delete Task
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.props.onCloseModal}
                  >
                    Go Back
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>,
      modalContainer
    );
  }
}
