import React from 'react';
import './MoviesCard.css';

function MoviesCard({ item }) {
  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <h3>{item.title}</h3>
        <data className="movies-card__time">27 минут</data>
      </div>
      <img src={item.image} alt={item.title} />
    </li>
  );
}

export default MoviesCard;
