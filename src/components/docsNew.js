import React, { useState, useEffect } from "react";
import makeRequest from "./makeRequest";
import { Redirect } from "react-router-dom";

function DocNew() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);
  const [group, setGroups] = useState([]);
  const [doc, setDoc] = useState([]);

  useEffect(() => {
    makeRequest(
      "POST",
      `http://localhost:3001/docs/group/`,
      {},
      "application/x-www-form-urlencoded"
    ).then(({ data, ok, error }) => {
      if (ok) {
        setGroups(data.docs.map(({ id, name }) => ({ id, name })));
      } else {
        setError(error);
      }
    });
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let data = JSON.stringify({
      doc: {
        name: doc.name,
        disc: doc.disc,
        groupId: doc.groupId,
      },
    });
    makeRequest(
      "POST",
      `http://localhost:3001/docs/new`,
      data,
      "application/json"
    ).then(({ data, ok, error }) => {
      if (ok) {
        setSuccess(data);
        setIsRedirect(true);
      } else {
        setError(error);
      }
    });
  };

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else {
    if (isRedirect) {
      return <Redirect to={`/docs/${success.doc.id}`} />;
    }
    return (
      <div>
        <div className="column">
          <div className="card m-6">
            <div className="card-content">
              <h2 className="title is-4">Введите данные документа</h2>

              <p className="notification is-success">{success.success}</p>

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
                            ...doc,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                  </label>
                </div>
                <div className="field">
                  <label className="label">
                    Группа
                    <div className="control">
                      <select
                        required
                        className="select"
                        type="text"
                        onChange={(e) =>
                          setDoc({
                            ...doc,
                            groupId: e.target.value,
                          })
                        }
                      >
                        <option value="" key="sdf" hidden>
                          Нужно выбрать группу из списка
                        </option>
                        {group.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
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
                            ...doc,
                            disc: e.target.value,
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
    );
  }
}

export default DocNew;
