import React, {useState, useEffect} from 'react';
import Tile from './Tile';
import Nav from './Nav';

function Dashboard() {
    const userId = localStorage.getItem('id');
    const API = 'http://localhost:3000/users';
    const [tiles, setTiles] = useState(false);

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

    if (tiles === false) {
        return <h1>Ładuję...</h1>;
    }

    return (
        <>
        <Nav />
        <h1>Requests you accepted</h1>
        {tiles.map((el) => el.id === parseInt(userId) && <Tile key={el.id}
                              name={el.accepted[0]}
                              pet={el.accepted[1]}
                              dateFrom={el.accepted[2]}
                              dateTo={el.accepted[3]}
                              />
                              )}
        <h1>Your requests</h1>
        <div>
        {tiles.map((el) => el.id === parseInt(userId) && <Tile key={el.id}
                              name={el.username}
                              pet={el.requests[0]}
                              dateFrom={el.requests[1]}
                              dateTo={el.requests[2]}
                              />
                              )}
        </div>
        </>
    )
}

export default Dashboard;
