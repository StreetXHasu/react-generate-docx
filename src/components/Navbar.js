import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

function Navbar() {
  return (
    <header className="App-header">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-brand is-expanded">
          <a className="navbar-item" href="https://bulma.io">
            <img src={logo} className="App-logo" alt="logo" />
          </a>

          <Link className="navbar-item" to="/">
            Главная
          </Link>
          <Link className="navbar-item" to="/group">
            Группы документов
          </Link>
          <Link className="navbar-item" to="/docs">
            Документы
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a>

              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
