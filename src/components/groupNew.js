import React, { useState } from "react";
import makeRequest from "./makeRequest";
import { Redirect } from "react-router-dom";

function GroupNew() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [group, setGroups] = useState([]);
  // Примечание: пустой массив зависимостей [] означает, что
  // этот useEffect будет запущен один раз
  // аналогично componentDidMount()

  const handleSubmit = (evt) => {
    setIsLoaded(false);
    evt.preventDefault();

    const data = new FormData();
    data.append("name", group.name);
    data.append("disc", group.disc);
    data.append("avatar", group.img);

    makeRequest("POST", "http://localhost:3001/docs/group/new", data).then(
      ({ data, ok, error }) => {
        if (ok) {
          console.log("тест ", data);
          setSuccess(data);
          setIsRedirect(true);
        } else {
          setError({ message: ` ${error}` });
        }
        setIsLoaded(true);
      }
    );
  };

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
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
