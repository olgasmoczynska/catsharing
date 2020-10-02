import React, {useState, useEffect} from 'react';
import Tile from "./Tile";
const API = "http://localhost:3000/users";

function Home({onAccepted}) {
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
    <div>
    {tiles.map((el) => <><Tile key={el.id}
                              name={el.username}
                              pet={el.requests[0]}
                              dateFrom={el.requests[1]}
                              dateTo={el.requests[2]}
                              />
                              <button onClick={() => onAccepted(el)}>Accept</button></>
                              )}
    </div>
    </>
  );
}

export default Home;
