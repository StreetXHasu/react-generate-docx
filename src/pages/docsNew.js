import React from "react";
import NewDoc from "../components/docsNew";

export default function docsNew() {
  return (
    <div className="group">
      <h1 className="title is-2">Создание нового документа</h1>
      <NewDoc />
    </div>
  );
}
