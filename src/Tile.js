import React from 'react';
const faker = require('faker');

function Tile({name, pet, dateFrom, dateTo}) {

  return (
      <div>
        <div>
            <img className="avatar" alt="human-avatar" src={faker.image.avatar()} />
            <div><h2>{name}</h2></div>
        </div>
        <div>Requested petsitting for a <span>{pet}</span></div>
        <div>from <span>{dateFrom}</span></div>
        <div>to <span>{dateTo}</span></div>
      </div>
  );
}

export default Tile;
