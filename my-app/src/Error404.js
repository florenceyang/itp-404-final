import React from "react";

export default class Error404 extends React.Component {
  render() {
    return (
      <div>
        <h1 style={{ color: "red" }}>404 ERROR</h1>
        <h3>The URL typed does not exist!!</h3>
      </div>
    );
  }
}
