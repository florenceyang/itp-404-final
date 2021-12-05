import React from "react";
import TaskGroup from "./TaskGroup";

export default class WeeklyAgenda extends React.Component {
  render() {
    return (
      <div>
        <h1 className="header_day">Monday</h1>
        <TaskGroup filter="to_do_day=Monday" />
        <h1 className="header_day">Tuesday</h1>
        <TaskGroup filter="to_do_day=Tuesday" />
        <h1 className="header_day">Wednesday</h1>
        <TaskGroup filter="to_do_day=Wednesday" />
        <h1 className="header_day">Thursday</h1>
        <TaskGroup filter="to_do_day=Thursday" />
        <h1 className="header_day">Friday</h1>
        <TaskGroup filter="to_do_day=Friday" />
        <h1 className="header_day">Saturday</h1>
        <TaskGroup filter="to_do_day=Saturday" />
        <h1 className="header_day">Sunday</h1>
        <TaskGroup filter="to_do_day=Sunday" />
      </div>
    );
  }
}
