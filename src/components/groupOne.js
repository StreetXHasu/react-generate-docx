import React, { useState, useEffect } from "react";
import OneGroup from "./oneGroup";
import { useParams } from "react-router-dom";

function GroupOne() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [group, setGroups] = useState([]);
  let { id } = useParams();
  // Примечание: пустой массив зависимостей [] означает, что
  // этот useEffect будет запущен один раз
  // аналогично componentDidMount()
  useEffect(() => {
    fetch(`http://localhost:3001/docs/group/${id}`, {
      method: "POST",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTk4MDIzOTk0fQ.qalGYUk1DWF0IT-VAiXwG2Gowe0WgHGjTfNJ2mlu_hw",
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (!result.doc_group) {
            setError({ message: "Нету такой группы" });
          }
          setIsLoaded(true);
          setGroups(result.doc_group);
        },
        // Примечание: Обрабатывать ошибки необходимо именно здесь
        // вместо блока catch(), чтобы не пропустить
        // исключения из реальных ошибок в компонентах.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [id]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch(`http://localhost:3001/docs/group/${id}/edit`, {
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
      .then((data) => setSuccess(data.success));
  };
  const handleSubmitDelete = (evt) => {
    evt.preventDefault();
    fetch(`http://localhost:3001/docs/group/${id}/del`, {
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
        setError({ message: data.success });
      });
  };

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div>
        <h1 className="title is-2">Информация о группе</h1>
        <div class="columns">
          <div class="column">
            <OneGroup prop={group} key={group.id} />
          </div>

          <div className="column">
            <div className="card m-2">
              <div className="card-content">
                <h2 className="title is-4">
                  Редактирвоание{" "}
                  <button
                    className="button is-danger is-small"
                    onClick={handleSubmitDelete}
                  >
                    <i className="material-icons">delete</i>
                  </button>
                </h2>

                <p className="notification is-success">{success}</p>

                <form onSubmit={handleSubmit}>
                  <div class="field">
                    <label class="label">
                      Название группы
                      <div class="control">
                        <input
                          class="input"
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
                      </div>
                    </label>
                  </div>
                  <div class="field">
                    <label class="label">
                      Описание
                      <div class="control">
                        <textarea
                          class="textarea"
                          type="text"
                          value={group.disc || ""}
                          onChange={(e) =>
                            setGroups({
                              name: group.name,
                              disc: e.target.value,
                              id: group.id,
                            })
                          }
                        />
                      </div>
                    </label>
                  </div>
                  <input
                    className="button is-success is-left"
                    type="submit"
                    value="Отправить"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupOne;
