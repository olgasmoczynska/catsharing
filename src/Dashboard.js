import React, {useState, useEffect} from 'react';
import Tile from './Tile';
import Nav from './Nav';
import { Redirect } from 'react-router-dom';
import { getUsers } from './service';

function Dashboard() {
    const userId = localStorage.getItem('id');
    const API = 'http://localhost:3000/users';
    const [tiles, setTiles] = useState(false);
    const [logged, setLogged] = useState(true);

    function onLogout() {
        localStorage.removeItem('username');
        setLogged(false);
    }

    const handleDelete = (isRequest) => {
      let bodyString = JSON.stringify( isRequest ? { requests: [] } : { accepted: [] })
              fetch(`${API}/${userId}`, {
                method: "PATCH",
                body: bodyString,
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
                .then(data => console.log(data))
                .catch(err => console.log(err))
                .finally(() => {
                  getUsers().then(data => setTiles(data))
                })
          }

    useEffect(() => {
        getUsers()
        .then(data => setTiles(data))
    }, []);

    if (tiles === false) {
        return <h1>Ładuję...</h1>;
    }

    if (logged) {
        return (
            <>
            <Nav onLogout={onLogout} />
            <div className="dashboardContainer">
            <div className="dashboardCard">
            <h1>Requests you accepted</h1>
            {tiles.map((el) => (el.accepted && el.accepted.length > 0 && el.id === parseInt(userId)) && <div className="tile"><Tile key={el.id}
                                  name={el.accepted[0]}
                                  pet={el.accepted[1]}
                                  dateFrom={el.accepted[2].replace('T',' ').substring(0, 10)}
                                  dateTo={el.accepted[3].replace('T',' ').substring(0, 10)}
                                  />
                                  <button className="button tileButton" onClick={() => handleDelete(false)}>Delete</button></div>
                                  )}
            </div>
            <div className="dashboardCard">
            <h1>Your requests</h1>
            {tiles.map((el) => (el.requests && el.requests.length > 0 && el.id === parseInt(userId)) && <div className="tile"><Tile key={el.id}
                                  name={el.username}
                                  pet={el.requests[0]}
                                  dateFrom={el.requests[1].replace('T',' ').substring(0, 10)}
                                  dateTo={el.requests[2].replace('T',' ').substring(0, 10)}
                                  />
                                  <button className="button tileButton" onClick={() => handleDelete(true)}>Delete</button></div>
                                  )}
            </div>
            </div>
            </>
        )
    } else {
        return <Redirect to='/' />
    }
}

export default Dashboard;
