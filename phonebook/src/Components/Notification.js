import React from "react";
const Notification = ({ message, hasError }) => {
  const notificationStyle = {
    background: "lightgrey",
    color: "green",
    fontSize: 20,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderStyle: "solid",
  };
  const errorStyle = {
    background: "lightgrey",
    color: "red",
    fontSize: 20,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderStyle: "solid",
  };
  if (message === null) {
    return null;
  }
  return <div style={hasError ? errorStyle : notificationStyle}>{message}</div>;
};
export default Notification;
