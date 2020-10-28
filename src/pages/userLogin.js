import React, { useState } from "react";
import makeRequest from "../components/makeRequest";
import { Redirect } from "react-router-dom";

export default function Login() {
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
        console.log("тест ", data);
        let value = data.token;

        // кодирует в my%20name=John%20Smith
        document.cookie =
          encodeURIComponent("token") + "=" + encodeURIComponent(value);

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
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input"
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
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="input"
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
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button is-success">Вход</button>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
