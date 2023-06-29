import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";
const Course = ({ course }) => {
  return (
    <li>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </li>
  );
};
export default Course;
