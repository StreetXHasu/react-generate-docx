import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectUser } from "./Auth";
import { Link } from "react-router-dom";

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
  const dispatch = useDispatch();
  return (
    <div className="buttons">
      <Link className="button is-primary" to="/user">
        <strong>Юзвер</strong>
      </Link>
      <Link onClick={() => dispatch(logout())} className="button" to="/logout">
        <strong>выйти</strong>
      </Link>
    </div>
  );
}
function Navbar_auth() {
  const user = useSelector(selectUser);

  if (user) {
    return <Login />;
  }
  return <Ghost />;
}
export default Navbar_auth;
