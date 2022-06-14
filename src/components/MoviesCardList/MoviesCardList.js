import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

import cardListHandle from '../../utils/cardListHandle';

function MoviesCardList({ ARR_LENGTH }) {
  const [movies, setMovies] = useState(cardListHandle(ARR_LENGTH));

  function showMoreCards() {
    const newArr = cardListHandle(ARR_LENGTH);
    setMovies([...movies, ...newArr]);
  }

  useEffect(() => {
    setMovies(cardListHandle(ARR_LENGTH));
  }, [ARR_LENGTH]);

  return (
    <>
      <ul className="movies-cards-list">
        {
        movies.map((item, i) => <MoviesCard key={i} item={item} />)
      }
      </ul>
      {
        (ARR_LENGTH >= 12)
        && <button className="show-more-button button-hover" type="button" onClick={() => showMoreCards()}>Еще</button>
      }
    </>
  );
}

export default MoviesCardList;
