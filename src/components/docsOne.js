import React, { useState, useEffect } from "react";
import OneDoc from "./oneDoc";
import { useParams } from "react-router-dom";

function DocOne() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [doc, setDoc] = useState([]);
  let { id } = useParams();
  // Примечание: пустой массив зависимостей [] означает, что
  // этот useEffect будет запущен один раз
  // аналогично componentDidMount()
  useEffect(() => {
    fetch(`http://localhost:3001/docs/${id}`, {
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
          if (!result.doc) {
            setError({ message: "Нету такой группы" });
          }
          setIsLoaded(true);
          setDoc(result.doc);
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
    fetch(`http://localhost:3001/docs/${id}/edit`, {
      method: "POST",
      body: JSON.stringify({
        doc: {
          name: doc.name,
          disc: doc.disc,
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
    fetch(`http://localhost:3001/docs/${id}/del`, {
      method: "POST",
      body: JSON.stringify({
        doc: {
          name: doc.name,
          disc: doc.disc,
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
        <h1 className="title is-2">Информация о документе</h1>
        <div className="columns">
          <div className="column">
            <OneDoc prop={doc} key={doc.id} />
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
                  <div className="field">
                    <label className="label">
                      Название документа
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          value={doc.name || ""}
                          onChange={(e) =>
                            setDoc({
                              name: e.target.value,
                              disc: doc.disc,
                              id: doc.id,
                            })
                          }
                        />
                      </div>
                    </label>
                  </div>
                  <div className="field">
                    <label className="label">
                      Описание
                      <div className="control">
                        <textarea
                          className="textarea"
                          type="text"
                          value={doc.disc || ""}
                          onChange={(e) =>
                            setDoc({
                              name: doc.name,
                              disc: e.target.value,
                              id: doc.id,
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

export default DocOne;
