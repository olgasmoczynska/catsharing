import React from 'react';
const faker = require('faker');

function Tile(props) {
  return (
      <div>
        <div>
            <img alt="human-avatar" src={faker.image.avatar()} />
            <div>{props.name}</div>
        </div>
        <div>Requested petsitting for a {props.pet}</div>
        <div>From {props.dateFrom} to {props.dateTo}</div>
      </div>
  );
}

export default Tile;