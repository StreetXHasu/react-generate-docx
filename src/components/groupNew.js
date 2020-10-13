import React, { useState } from "react";
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

    const data = new FormData();
    data.append("name", group.name);
    data.append("disc", group.disc);
    data.append("img", group.img);
    console.log(data);
    fetch(`http://localhost:3001/docs/group/new`, {
      method: "POST",
      body: data,
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTk4MDIzOTk0fQ.qalGYUk1DWF0IT-VAiXwG2Gowe0WgHGjTfNJ2mlu_hw",
        "Content-Type": "multipart/form-data; boundary=boundary",
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
      return <Redirect to={`/group/${success.doc.id}`} />;
    }
    return (
      <div>
        <div className="column">
          <div className="card m-6">
            <div className="card-content">
              <h2 className="title is-4">Введите данные группы</h2>

              <p className="notification is-success">{success.success}</p>

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
                            ...group,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                  </label>
                </div>
                <div className="file has-name">
                  <label className="file-label">
                    <input
                      className="file-input"
                      onChange={(e) =>
                        setGroups({
                          ...group,
                          img: e.target.files[0],
                          imgName: e.target.files[0].name,
                        })
                      }
                      type="file"
                      name="resume"
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">Выбрать картинку</span>
                    </span>
                    <span className="file-name">
                      {group.imgName || "формат .png .jpg .gif"}
                    </span>
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
                            ...group,
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

export default GroupNew;
