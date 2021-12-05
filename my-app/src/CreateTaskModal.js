import React from "react";
import ReactDom from "react-dom";
import { toast } from "react-toastify"; // use for notifications

export default class CreateTaskModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      is_urgent: false,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.toggleUrgentCheck = this.toggleUrgentCheck.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleBodyChange(event) {
    this.setState({ body: event.target.value });
  }

  toggleUrgentCheck(event) {
    this.setState({ is_urgent: event.target.checked });
  }

  handleSubmit(event) {
    event.preventDefault();

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
        // close modal to go back to home page
        this.props.onCloseModal();
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
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Create Task
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.props.onCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>,
      modalContainer
    );
  }
}