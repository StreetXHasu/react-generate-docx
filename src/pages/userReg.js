import React, { useState } from "react";
import makeRequest from "../components/makeRequest";
import { Redirect } from "react-router-dom";

export default function Reg() {
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
      username: getField.username,
      userpassword: getField.userpassword,
    });

    makeRequest(
      "POST",
      "http://localhost:3001/reg",
      data,
      "application/json"
    ).then(({ data, ok, error }) => {
      if (ok) {
        console.log("тест ", data);
        setSuccess(data);
        setIsRedirect(true);
      } else {
        setError({ message: ` ${error}` });
      }
      setIsLoaded(true);
    });
  };

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className="reg">
        <p className="notification is-success">{success.success}</p>
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
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                name="username"
                placeholder="Как вас зовут?"
                value={getField.username || ""}
                onChange={(e) =>
                  setgetField({
                    ...getField,
                    username: e.target.value,
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
              <button className="button is-success">Регистрация</button>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
