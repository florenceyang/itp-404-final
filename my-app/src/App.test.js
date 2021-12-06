import { render, screen } from "@testing-library/react";
import App from "./App";
import TaskGroup from "./TaskGroup";
import Today from "./Today";
import { createMemoryHistory } from "history";
import WeeklyAgenda from "./WeeklyAgenda";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import CheckListItem from "./CheckListItem";
import TaskDetailsModal from "./TaskDetailsModal";
import Tomorrow from "./Tomorrow";
import UrgentTasks from "./UrgentTasks";
import Navigation from "./Navigation";

test("render all 7 days in the weekly view", () => {
  const { getByTestId } = render(<WeeklyAgenda />);

  expect(getByTestId("week-header-0").innerHTML).toBe("Monday");
  expect(getByTestId("week-header-1").innerHTML).toBe("Tuesday");
  expect(getByTestId("week-header-2").innerHTML).toBe("Wednesday");
  expect(getByTestId("week-header-3").innerHTML).toBe("Thursday");
  expect(getByTestId("week-header-4").innerHTML).toBe("Friday");
  expect(getByTestId("week-header-5").innerHTML).toBe("Saturday");
  expect(getByTestId("week-header-6").innerHTML).toBe("Sunday");
});
// test("render Tuesday in the weekly view", () => {
//   const { getByTestId } = render(<WeeklyAgenda />);

//   expect(getByTestId("week-header-1").innerHTML).toBe("Tuesday");
// });
// test("render Wednesday in the weekly view", () => {
//   const { getByTestId } = render(<WeeklyAgenda />);

// });
// test("render Thursday in the weekly view", () => {
//   const { getByTestId } = render(<WeeklyAgenda />);

// });
// test("render Friday in the weekly view", () => {
//   const { getByTestId } = render(<WeeklyAgenda />);

// });
// test("render Saturday in the weekly view", () => {
//   const { getByTestId } = render(<WeeklyAgenda />);

// });
// test("render Tuesday in the weekly view", () => {
//   const { getByTestId } = render(<WeeklyAgenda />);

// });

test("calculating the correct day for today", () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day_name = days[new Date().getDay()];
  expect(day_name).toBe("Sunday"); // this has to be manually changed depending on which day test is ran
});

test("showing correct day for today page", () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day_name = days[new Date().getDay()];
  const { getByTestId } = render(
    <>
      <Today match={{ params: { current_day: new Date().getDay() } }} />
    </>
  );

  expect(getByTestId("today-header").innerHTML).toBe(day_name);
});

test("calculating the correct day for tomorrow", () => {
  const tomorrow_days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const day_name = tomorrow_days[new Date().getDay()];
  expect(day_name).toBe("Monday"); // this has to be manually changed depending on which day test is ran
});

test("showing correct day for tomorrow page", () => {
  const tomorrow_days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const day_name = tomorrow_days[new Date().getDay()];
  const { getByTestId } = render(
    <>
      <Tomorrow match={{ params: { current_day: new Date().getDay() } }} />
    </>
  );

  expect(getByTestId("tomorrow-header").innerHTML).toBe(day_name);
});

test("rendering checkbox for every task", () => {
  const { getByTestId } = render(
    <CheckListItem
      task={{
        title: "Do Chores",
        body: "Body 2!",
        is_bookmarked: false,
        time_bookmarked: "",
        to_do_day: "Wednesday",
      }}
    />
  );

  expect(getByTestId("checkbox-icon")).toBeTruthy();
});

test("rendering urgent icon (!) with bookmarked task", () => {
  const { getByTestId } = render(
    <CheckListItem
      task={{
        title: "Do Chores",
        body: "Body 2!",
        is_bookmarked: true,
        time_bookmarked:
          "Sun Dec 05 2021 01:01:36 GMT-0800 (Pacific Standard Time)",
        to_do_day: "Wednesday",
      }}
    />
  );

  expect(getByTestId("urgent-icon")).toBeTruthy();
});

test("rendering more details button for every task", () => {
  const { getByTestId } = render(
    <CheckListItem
      task={{
        title: "Do Chores",
        body: "Body 2!",
        is_bookmarked: true,
        time_bookmarked:
          "Sun Dec 05 2021 01:01:36 GMT-0800 (Pacific Standard Time)",
        to_do_day: "Wednesday",
      }}
    />
  );

  expect(getByTestId("info-icon")).toBeTruthy();
});

test("displaying the correct task title", () => {
  const { getByTestId } = render(
    <CheckListItem
      task={{
        title: "Do Chores",
        body: "Body 2!",
        is_bookmarked: true,
        time_bookmarked:
          "Sun Dec 05 2021 01:01:36 GMT-0800 (Pacific Standard Time)",
        to_do_day: "Wednesday",
      }}
    />
  );

  expect(getByTestId("task-title").innerHTML).toBe("Do Chores");
});

test("be able to add task on every page", () => {
  const { getAllByTestId } = render(
    <>
      <Home />
      <Today match={{ params: { current_day: 0 } }} />
      <Tomorrow match={{ params: { current_day: 0 } }} />
      <UrgentTasks />
    </>
  );

  expect(getAllByTestId("add-task-button").length).toBe(4);
});

test("have all the correct links in navbar", () => {
  const { getByTestId } = render(
    <>
      <Router>
        <Navigation />
      </Router>
    </>
  );

  expect(getByTestId("nav-link-name-0").innerHTML).toBe("Home");
  expect(getByTestId("nav-link-name-1").innerHTML).toBe("Today's Tasks");
  expect(getByTestId("nav-link-name-2").innerHTML).toBe("Tomorrow's Tasks");
  expect(getByTestId("nav-link-name-3").innerHTML).toBe("Urgent Tasks");
});

test("render correct page headers for every page", () => {
  const { getByTestId } = render(
    <>
      <Home />
      <Today match={{ params: { current_day: 0 } }} />
      <Tomorrow match={{ params: { current_day: 0 } }} />
      <UrgentTasks />
    </>
  );

  expect(getByTestId("home-pg-header").innerHTML).toBe(
    "🚀 Your week looks like:"
  );
  expect(getByTestId("today-pg-header").innerHTML).toBe("✨ Today looks like:");
  expect(getByTestId("urgent-pg-header").innerHTML).toBe(
    "🚨 Here's what's urgent!!"
  );
  expect(getByTestId("tomorrow-pg-header").innerHTML).toBe(
    "🔮 Tomorrow looks like:"
  );
});
