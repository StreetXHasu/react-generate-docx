import React, { useState, useEffect } from "react";
import makeRequest from "./makeRequest";
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
    makeRequest("POST", `http://localhost:3001/docs/group/${id}`).then(
      ({ data, ok, error }) => {
        if (ok) {
          if (!data.doc_group) {
            setError({ message: "Нету такой группы" });
          }
          setGroups(data.doc_group);
        } else {
          setError(error);
        }
        setIsLoaded(true);
      }
    );
  }, [id]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = new FormData();
    data.append("name", group.name);
    data.append("disc", group.disc);
    makeRequest(
      "POST",
      `http://localhost:3001/docs/group/${id}/edit`,
      data
    ).then(({ data, ok, error }) => {
      if (ok) {
        setSuccess(data.success);
      } else {
        setError(error);
      }
      setIsLoaded(true);
    });
  };
  const handleSubmitDelete = (evt) => {
    evt.preventDefault();
    const data = new FormData();
    data.append("name", group.name);
    data.append("disc", group.disc);
    makeRequest(
      "POST",
      `http://localhost:3001/docs/group/${id}/del`,
      data
    ).then(({ data, ok, error }) => {
      if (ok) {
        setSuccess(data.success);
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
        <h1 className="title is-2">Информация о группе</h1>
        <div className="columns">
          <div className="column">
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
                  <div className="field">
                    <label className="label">
                      Название группы
                      <div className="control">
                        <input
                          className="input"
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
                  <div className="field">
                    <label className="label">
                      Описание
                      <div className="control">
                        <textarea
                          className="textarea"
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
        <div className="card m-2">
          <div className="card-content">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Документ</th>
                  <th>Описание</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>ID</th>
                  <th>Документ</th>
                  <th>Описание</th>
                </tr>
              </tfoot>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>81</td>
                  <td>Qualification for the </td>
                </tr>
                <tr>
                  <th>1</th>
                  <td>81</td>
                  <td>Qualification for the </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupOne;
