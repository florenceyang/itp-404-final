import React from "react";
import CheckListItem from "./CheckListItem";

export default class TaskGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    const filter = this.props.filter;
    // GET REQUEST
    fetch(`https://itp404-final-server.herokuapp.com/api/tasks?${filter}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        // json returns an array so we populate ours with it
        this.setState({ tasks: json });
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.tasks.map((task, i) => {
            return <CheckListItem key={i} task={task} />;
          })}
        </ul>
      </div>
    );
  }
}
