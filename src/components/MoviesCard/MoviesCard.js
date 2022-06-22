import React, { useState } from 'react';
import './MoviesCard.css';
import SaveButton from './SaveButton/SaveButton';
import ExternalLink from '../ExternalLink/ExternalLink';

const apiUrl = 'https://api.nomoreparties.co';

function MoviesCard({ item, inSavedMovies }) {
  const [isSaved, setIsSaved] = useState(false);

  function getHourMinuteTime(duration) {
    const hour = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hour > 0 ? `${hour} ч ${minutes} мин` : `${minutes} мин`;
  }

  const handlerSave = () => {
    setIsSaved(!isSaved);
    console.log(item);
  };

  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <h3 className="movies-card__title ">
          {item.nameRU}
        </h3>
        <data className="movies-card__time">
          {item.year}
          {', '}
          {getHourMinuteTime(item.duration)}
        </data>
      </div>
      <ExternalLink
        className="movies-card__wrapper_image"
        link={item.trailerLink}
      >
        <img className="movies-card__image" src={apiUrl + item.image.url} alt={item.image.name} />
      </ExternalLink>
      <SaveButton isSaved={isSaved} onClick={handlerSave} cardInSaved={inSavedMovies} />
    </li>
  );
}

export default MoviesCard;
