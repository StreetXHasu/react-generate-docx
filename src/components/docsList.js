import React, { useState, useEffect } from "react";
import makeRequest from "./makeRequest";
import OneGroup from "./oneDoc";

function DocsList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    makeRequest(
      "POST",
      `http://localhost:3001/docs/`,
      {},
      "application/x-www-form-urlencoded"
    ).then(({ data, ok, error }) => {
      if (ok) {
        setIsLoaded(true);
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
