import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import Navbar_auth from "./Navbar_auth";

function Navbar() {
  return (
    <header className="App-header">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-brand is-expanded">
          <Link className="navbar-item" to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <Link className="navbar-item" to="/group">
            Группы
          </Link>
          <Link className="navbar-item" to="/docs">
            Документы
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a href="#." className="navbar-link">
              1
            </a>

            <div className="navbar-dropdown">
              <a href="#." className="navbar-item">
                About
              </a>
              <a href="#." className="navbar-item">
                Jobs
              </a>
              <a href="#." className="navbar-item">
                Contact
              </a>
              href
              <a href="#." className="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <Navbar_auth />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
