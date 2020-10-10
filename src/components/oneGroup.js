import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Group({ prop }) {
  return (
    <div className="list-item">
      <p className="title">
        <Link to={"/group/" + prop.id}>{prop.name}</Link>{" "}
        <small>{prop.id}</small>
      </p>
      <p>{prop.disc}</p>
    </div>
  );
}

export default Group;
