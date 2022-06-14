import React, { useState } from 'react';
import './MoviesCard.css';
import SaveButton from './SaveButton/SaveButton';

function MoviesCard({ item }) {
  const [isSaved, setIsSaved] = useState(false);

  const handlerSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <h3 className="movies-card__title ">{item.title}</h3>
        <data className="movies-card__time">27 минут</data>
      </div>
      <img className="movies-card__image" src={item.image} alt={item.title} />
      <SaveButton isSaved={isSaved} onClick={handlerSave} />
    </li>
  );
}

export default MoviesCard;
