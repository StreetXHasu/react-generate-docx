import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

function DocNew() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);
  const [group, setGroups] = useState([]);
  const [doc, setDoc] = useState([]);
  // Примечание: пустой массив зависимостей [] означает, что
  // этот useEffect будет запущен один раз
  // аналогично componentDidMount()

  useEffect(() => {
    fetch(`http://localhost:3001/docs/group/`, {
      method: "POST",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTk4MDIzOTk0fQ.qalGYUk1DWF0IT-VAiXwG2Gowe0WgHGjTfNJ2mlu_hw",
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Группы", result);
        setGroups(result.docs.map(({ id, name }) => ({ id, name })));
      });
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch(`http://localhost:3001/docs/new`, {
      method: "POST",
      body: JSON.stringify({
        doc: {
          name: doc.name,
          disc: doc.disc,
          groupId: doc.groupId,
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
      })
      .catch((error) => setError(error));
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
