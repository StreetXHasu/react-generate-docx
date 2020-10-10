import React from "react";
import { Link } from "react-router-dom";

function Group({ prop }) {
  return (
    <div class="card m-2">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">
              <Link to={"/group/" + prop.id}>{prop.name}</Link> <small></small>
              <span class="tag is-light">{prop.id}</span>
            </p>
          </div>
        </div>
        <div class="content">{prop.disc}</div>
      </div>
    </div>
  );
}

export default Group;
