import React, { useState, useEffect } from "react";
import OneGroup from "./oneDoc";

function DocsList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [groups, setGroups] = useState([]);

  // Примечание: пустой массив зависимостей [] означает, что
  // этот useEffect будет запущен один раз
  // аналогично componentDidMount()
  useEffect(() => {
    fetch("http://localhost:3001/docs/", {
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
          setIsLoaded(true);
          setGroups(result.docs);
        },
        // Примечание: Обрабатывать ошибки необходимо именно здесь
        // вместо блока catch(), чтобы не пропустить
        // исключения из реальных ошибок в компонентах.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div>
        <h2 className="title is-4">Количество документов: {groups.length}</h2>
        <div className="columns is-multiline">
          {groups.map((group) => (
            <OneGroup prop={group} key={group.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default DocsList;
