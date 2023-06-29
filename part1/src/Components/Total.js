import React from "react";
const Total = ({ parts }) => {
  const sum = parts.reduce(
    (currentSum, part) => currentSum + part.exercises,
    0
  );
  return <h3>Total of {sum} exercises</h3>;
};
export default Total;
