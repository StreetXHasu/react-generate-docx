import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectUser } from "../components/Auth";
import makeRequest from "../components/makeRequest";
import { Redirect } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [getField, setgetField] = useState([]);

  const handleSubmit = (evt) => {
    setIsLoaded(false);
    evt.preventDefault();

    const data = JSON.stringify({
      userlogin: getField.userlogin,
      userpassword: getField.userpassword,
    });

    makeRequest(
      "POST",
      "http://localhost:3001/login",
      data,
      "application/json"
    ).then(({ data, ok, error }) => {
      if (ok) {
        if (!data.token) {
          setSuccess(data.message);
        } else {
          console.log("тест эрор ", typeof data.token);

          let value = data.token;

          // кодирует в my%20name=John%20Smith
          dispatch(login());
          document.cookie =
            encodeURIComponent("token") + "=" + encodeURIComponent(value);

          setIsRedirect(true);
        }
      } else {
        setError(error);
      }
      setIsLoaded(true);
    });
  };

  function Notification({ ok }) {
    if (ok) {
      return <p className="notification is-danger">{ok}</p>;
    } else {
      return "";
    }
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className="reg">
        {success && <p className="notification is-danger">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                name="userlogin"
                placeholder="Логин"
                value={getField.userlogin || ""}
                onChange={(e) =>
                  setgetField({
                    ...getField,
                    userlogin: e.target.value,
                  })
                }
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                name="userpassword"
                placeholder="пароль"
                value={getField.userpassword || ""}
                onChange={(e) =>
                  setgetField({
                    ...getField,
                    userpassword: e.target.value,
                  })
                }
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-success">Вход</button>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
