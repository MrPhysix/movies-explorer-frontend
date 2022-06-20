import React, { useState } from 'react';
import './MoviesCard.css';
import SaveButton from './SaveButton/SaveButton';
import ExternalLink from '../ExternalLink/ExternalLink';

const apiUrl = 'https://api.nomoreparties.co';

function MoviesCard({ item, inSavedMovies }) {
  const [isSaved, setIsSaved] = useState(false);

  const handlerSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <h3 className="movies-card__title ">
          {`${item.nameRU} (${item.year})`}
        </h3>
        <data className="movies-card__time">
          {item.duration}
          {' '}
          минут
        </data>
      </div>
      <ExternalLink
        className="movies-card__wrapper_image"
        link={item.trailerLink}
      >
        <img className="movies-card__image" src={apiUrl + item.image.url} alt={item.nameRU} />
      </ExternalLink>
      <SaveButton isSaved={isSaved} onClick={handlerSave} cardInSaved={inSavedMovies} />
    </li>
  );
}

export default MoviesCard;
