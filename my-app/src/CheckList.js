import React from "react";
import PropTypes from "prop-types";

export default class CheckList extends React.Component {
  render() {
    const checkboxes = [];

    for (let i = 0; i < 5; i++) {
      checkboxes.push(
        <Checkbox
          key={i}
          onTaskClick={this.props.onTaskClick}
          renderEmptyTask={this.props.renderEmptyTask}
          renderDoneTask={this.props.renderDoneTask}
        />
      );
    }

    return <ul>{checkboxes}</ul>;
  }
}

CheckList.propTypes = {
  onTaskClick: PropTypes.func.isRequired,
  renderEmptyTask: PropTypes.func.isRequired,
  renderDoneTask: PropTypes.func.isRequired,
};

class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      numTasksDone: 0,
    };

    this.onCheckboxClick = this.onCheckboxClick.bind(this);
  }

  onCheckboxClick() {
    this.setState({ checked: !this.state.checked });
    console.log("checked: ", this.state.checked);
    this.props.onTaskClick(this.state.checked ? -1 : 1);
  }
  render() {
    const { renderEmptyTask, renderDoneTask } = this.props;

    return this.state.checked
      ? renderDoneTask(this.onCheckboxClick)
      : renderEmptyTask(this.onCheckboxClick);
  }
}

Checkbox.propTypes = {
  onTaskClick: PropTypes.func.isRequired,
  renderEmptyTask: PropTypes.func.isRequired,
  renderDoneTask: PropTypes.func.isRequired,
};
