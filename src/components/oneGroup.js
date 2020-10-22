import React from "react";
import { Link } from "react-router-dom";

function Group({ prop }) {
  return (
    <div className="card m-2">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img
                src={"http://localhost:3001/" + prop.img}
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">
              <Link to={"/group/" + prop.id}>{prop.name}</Link> <small></small>
              <span className="tag is-light">{prop.id}</span>
            </p>
          </div>
        </div>
        <div className="content">{prop.disc}</div>
      </div>
    </div>
  );
}

export default Group;
