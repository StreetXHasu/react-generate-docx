import React, { useState, useEffect } from "react";
import makeRequest from "./makeRequest";
import OneGroup from "./oneGroup";

function List() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [groups, setGroups] = useState([]);

  // Примечание: пустой массив зависимостей [] означает, что
  // этот useEffect будет запущен один раз
  // аналогично componentDidMount()
  useEffect(() => {
    makeRequest(
      "POST",
      "http://localhost:3001/docs/group/",
      {},
      "application/x-www-form-urlencoded"
    ).then(({ data, ok, error }) => {
      if (ok) {
        console.log(data);
        setGroups(data.docs);
      } else {
        setError(error);
      }
      setIsLoaded(true);
    });
  }, []);
  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div>
        <h2 className="title is-4">Количество групп: {groups.length}</h2>
        <div className="columns is-multiline">
          {groups.map((group) => (
            <OneGroup prop={group} key={group.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default List;
