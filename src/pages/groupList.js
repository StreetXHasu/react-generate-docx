import React from "react";
import { Link } from "react-router-dom";
import List from "../components/groupList";

export default function GroupList() {
  return (
    <div className="group">
      <h1 className="title is-2">
        Наши группы
        <Link to="/group/new">
          <span className="button tag is-small is-primary">
            <i className="material-icons">add</i> Создать группу
          </span>
        </Link>
      </h1>
      <List />
    </div>
  );
}
