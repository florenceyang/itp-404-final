import React from "react";
import ReactDom from "react-dom";
import { toast } from "react-toastify"; // use for notifications

export default class CreateTaskModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      to_do_day: "",
      is_urgent: false,
      task_created: false,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.toggleUrgentCheck = this.toggleUrgentCheck.bind(this);
    this.handleDaySelect = this.handleDaySelect.bind(this);
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
    console.log("posting new task");
    // POST REQUEST
    fetch("https://itp404-final-server.herokuapp.com/api/tasks", {
      method: "POST",
      // data/object we're sending in string form
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body,
        is_bookmarked: this.state.is_urgent,
        // referenced for getting timestamp: https://hdtuto.com/article/react-js-get-current-date-and-time-example
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
        toast.success(`Task "${json.title} was successfully created`);
        // show a success view in modal (so that toast has time to display rather than closing out modal automatically)
        this.setState({ task_created: true });
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
              <h5 className="modal-title">{this.props.title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={this.props.onCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              {!this.state.task_created ? (
                <form
                  onSubmit={(event) => {
                    console.log("going to submit form");
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
                <div>Yay! Your task was created :)</div>
              )}
            </div>
            <div className="modal-footer">
              {!this.state.task_created ? (
                <>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(event) => {
                      console.log("submit button clicked");
                      this.handleSubmit(event);
                    }}
                  >
                    Create Task
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.props.onCloseModal}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.props.onCloseModal}
                >
                  Exit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>,
      modalContainer
    );
  }
}
