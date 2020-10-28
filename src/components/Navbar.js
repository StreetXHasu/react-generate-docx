import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

function getCookieValue(a) {
  var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}
function Ghost() {
  return (
    <div className="buttons">
      <Link className="button is-primary" to="/reg">
        <strong>Регистрация</strong>
      </Link>
      <Link className="button is-light" to="/login">
        Вход
      </Link>
    </div>
  );
}
function Login() {
  return (
    <div className="buttons">
      <Link className="button is-primary" to="/user">
        <strong>Юзвер</strong>
      </Link>
      <Link className="button" to="/logout">
        <strong>выйти</strong>
      </Link>
    </div>
  );
}
function Greeting() {
  if (getCookieValue("token").length >= 1) {
    return <Login />;
  }
  return <Ghost />;
}
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
            <Greeting />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
