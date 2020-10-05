import React, {useState, useEffect} from 'react';
import Tile from "./Tile";
import Nav from "./Nav";
import {  Redirect } from 'react-router-dom';
import { getUsers } from './service';
const API = 'http://localhost:3000/users';

function Home() {
  const [tiles, setTiles] = useState(false);
  const [logged, setLogged] = useState(true);
  const [accepted, setAccepted] = useState([]);

  function onLogout() {
    localStorage.removeItem('username');
    setLogged(false);
  }

  const addToAccepted = (el) => {
    setAccepted([...accepted, el]);
  };

  useEffect(() => {
    fetch(API)
      .then(response => {
        if (response.ok === false) {
          throw new Error("Błąd sieci!");
        } else {
          return response.json();
        }
      })
      .then(data => setTiles(data))
      .catch(err => console.log(err));
  }, []);

  const handleClick = (el) => {
    const userId = localStorage.getItem('id');
    fetch(`${API}/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({
        accepted: [el.username, el.requests[0], el.requests[1], el.requests[2]]
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok === false) {
          throw new Error("Błąd sieci!");
        } else {
          return response.json();
        }
      })
      .then(data => {
          if (typeof addToAccepted === "function") {
            addToAccepted(data);
          };
      })
      .catch(err => console.log(err));
  }

  if (tiles === false) {
    return <h1>Ładuję...</h1>;
  }
  
  if (logged) {
    return (
      <>
      <Nav onLogout={onLogout} />
      <div className="grid">
      {tiles.map((el) => el.requests && el.requests.length > 0 && <div className="tile"><Tile key={el.id}
                                name={el.username}
                                pet={el.requests[0]}
                                dateFrom={el.requests[1].replace('T',' ').substring(0, 10)}
                                dateTo={el.requests[2].replace('T',' ').substring(0, 10)}
                                />
                                <button className="button tileButton" onClick={() => handleClick(el)}>Accept</button></div>
                                )}
      </div>
      </>
    );
  } else {
    return <Redirect to='/' />
  }
}

export default Home;
