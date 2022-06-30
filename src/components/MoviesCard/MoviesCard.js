import React, { useState, useEffect } from 'react';
import './MoviesCard.css';
import SaveButton from './SaveButton/SaveButton';
import ExternalLink from '../ExternalLink/ExternalLink';
import MainApi from '../../utils/api/MainApi';
//
import { moviesApiUrl } from '../../utils/consts';

function MoviesCard({
  item, inSavedMovies, savedMovies, setSavedMovies,
}) {
  const [isSaved, setIsSaved] = useState(false);
  // handlers
  function getHourMinuteTime(duration) {
    const hour = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hour > 0 ? `${hour} ч ${minutes} мин` : `${minutes} мин`;
  }

  const handlerSave = async () => {
    if (!inSavedMovies) {
      if (isSaved) {
        const savedMovieId = savedMovies.find(
          (savedMovie) => item.id === savedMovie.movieId,
        )._id;

        await MainApi.removeSavedMovie(savedMovieId);
        const newArr = await MainApi.getSavedMovies();

        setSavedMovies(newArr);
        setIsSaved(false);
      } else if (!isSaved && !inSavedMovies) {
        await MainApi.createSavedMovie(item);
        const newArr = await MainApi.getSavedMovies();

        setSavedMovies(newArr);
        setIsSaved(true);
      }
    } else {
      await MainApi.removeSavedMovie(item._id);
      const newArr = await MainApi.getSavedMovies();

      setSavedMovies(newArr);
    }
  };

  useEffect(() => {
    const saved = !inSavedMovies && savedMovies.some((movie) => movie.movieId === item.id);
    if (!inSavedMovies) setIsSaved(saved);
    return inSavedMovies && setIsSaved(true);
  }, [savedMovies]);

  const getMovieImg = () => {
    if (!inSavedMovies) {
      return `${moviesApiUrl}${item.image.url}`;
    }
    return item.image;
  };
  //
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
        <img className="movies-card__image" src={getMovieImg()} alt={item.image.name} />
      </ExternalLink>
      <SaveButton isSaved={isSaved} onClick={handlerSave} cardInSaved={inSavedMovies} />
    </li>
  );
}

export default MoviesCard;
