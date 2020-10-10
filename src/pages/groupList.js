import React from "react";
import { Link } from "react-router-dom";
import List from "../components/groupList";

export default function GroupList() {
  return (
    <div className="group">
      <h1>
        Наши группы{" "}
        <Link to="/group/new">
          <button>
            <i class="material-icons">add</i> Создать группу
          </button>
        </Link>
      </h1>
      <List />
    </div>
  );
}
