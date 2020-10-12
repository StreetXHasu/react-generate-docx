import React from "react";
import { Link } from "react-router-dom";

function Doc({ prop }) {
  return (
    <div className="card m-2">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">
              <Link to={"/docs/" + prop.id}>{prop.name}</Link> <small></small>
              <span className="tag is-light">{prop.id}</span>
              <span className="tag is-dark">{prop.docs_groupId}</span>
            </p>
          </div>
        </div>
        <div className="content">{prop.disc}</div>
      </div>
    </div>
  );
}

export default Doc;
