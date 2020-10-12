import React from "react";
import { Link } from "react-router-dom";
import DocsList from "../components/docsList";

export default function Docs() {
  return (
    <div className="docs">
      <h1 className="title is-2">
        Наши документы
        <Link to="/docs/new">
          <span className="button tag is-small is-primary">
            <i className="material-icons">add</i> Создать документ
          </span>
        </Link>
      </h1>
      <DocsList />
    </div>
  );
}
