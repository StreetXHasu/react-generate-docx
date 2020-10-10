import React, { useState, useEffect } from "react";
import OneGroup from "./oneGroup";
import { Redirect } from "react-router-dom";

function GroupNew() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);
  const [group, setGroups] = useState([]);
  // Примечание: пустой массив зависимостей [] означает, что
  // этот useEffect будет запущен один раз
  // аналогично componentDidMount()

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch(`http://localhost:3001/docs/group/new`, {
      method: "POST",
      body: JSON.stringify({
        doc: {
          name: group.name,
          disc: group.disc,
        },
      }),
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTk4MDIzOTk0fQ.qalGYUk1DWF0IT-VAiXwG2Gowe0WgHGjTfNJ2mlu_hw",
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccess(data);

        setInterval(() => {
          setIsRedirect(true);
        }, 3000);
      });
  };

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else {
    if (isRedirect) {
      return <Redirect to={`/group/${success.doc.id}`} />;
    }
    return (
      <div>
        <div className="edit">
          <h2>Заполните поля группы</h2>

          <p className="is-success">{success.success}</p>

          <form onSubmit={handleSubmit}>
            <label>
              Название группы:
              <input
                type="text"
                value={group.name || ""}
                onChange={(e) =>
                  setGroups({
                    name: e.target.value,
                    disc: group.disc,
                    id: group.id,
                  })
                }
              />
            </label>
            <br />
            <label>
              Описание:
              <textarea
                value={group.disc || ""}
                onChange={(e) =>
                  setGroups({
                    name: group.name,
                    disc: e.target.value,
                    id: group.id,
                  })
                }
              />
            </label>
            <br />
            <input type="submit" value="Создать" />
          </form>
        </div>
      </div>
    );
  }
}

export default GroupNew;
