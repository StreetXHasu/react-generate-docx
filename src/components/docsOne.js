import React, { useState, useEffect } from "react";
import makeRequest from "./makeRequest";
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
    makeRequest(
      "POST",
      `http://localhost:3001/docs/${id}`,
      {},
      "application/x-www-form-urlencoded"
    ).then(({ data, ok, error }) => {
      if (ok) {
        if (!data.doc) {
          setError({ message: "Нету такой группы" });
        }
        setIsLoaded(true);
        setDoc(data.doc);
      } else {
        setError(error);
      }
      setIsLoaded(true);
    });
  }, [id]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let data = JSON.stringify({
      doc: {
        name: doc.name,
        disc: doc.disc,
      },
    });
    makeRequest(
      "POST",
      `http://localhost:3001/docs/${id}/edit`,
      data,
      "application/json"
    ).then(({ data, ok, error }) => {
      if (ok) {
        setSuccess({ message: data.success });
      } else {
        setError(error);
      }
      setIsLoaded(true);
    });
  };
  const handleSubmitDelete = (evt) => {
    evt.preventDefault();
    let data = JSON.stringify({
      doc: {
        name: doc.name,
        disc: doc.disc,
      },
    });
    makeRequest(
      "POST",
      `http://localhost:3001/docs/${id}/del`,
      data,
      "application/json"
    ).then(({ data, ok, error }) => {
      if (ok) {
        setError({ message: data.success });
      } else {
        setError(error);
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
