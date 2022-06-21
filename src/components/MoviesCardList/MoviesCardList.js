import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import useResolution from '../../hooks/useResolution';

function MoviesCardList({
  inSavedMovies, movies, notFound, isLoading,
}) {
  const [
    isMobile,
    isTablet,
    isDesktop] = [
    useResolution('0', '480'),
    useResolution('561', '1024'),
    useResolution('1025'),
  ];
  // states
  const [visibleCards, setVisibleCards] = useState(0);
  // handlers
  const handleShowMore = () => {
    setVisibleCards((prev) => {
      if (prev === movies.length) return prev;
      return prev + 3;
    });
  };

  // effects

  useEffect(() => {
    if (isMobile === true) setVisibleCards(5);
    if (isTablet === true) setVisibleCards(8);
    if (isDesktop === true) setVisibleCards(12);
  }, [isMobile, isTablet, isDesktop]);

  useEffect(() => {
    console.log(visibleCards);
  }, [visibleCards]);

  if (isLoading) {
    return (<Preloader style={{ minHeight: '50vh' }} />);
  }
  if (notFound) {
    return (
      <div className="movies-cards-list_empty">
        <div className="movies-cards-list_empty__not-found">Ничего не найдено</div>
      </div>
    );
  }

  if (movies.length > 0) {
    return (
      <>
        <ul className="movies-cards-list">
          {
          movies.slice(0, visibleCards).map((item, i) => (
            <MoviesCard
              key={i}
              item={item}
              inSavedMovies={inSavedMovies}
            />
          ))
      }
        </ul>
        {
        visibleCards < movies.length && <button className="show-more-button button-hover" type="button" onClick={handleShowMore}>Еще</button>
}
      </>
    );
  }
  return (<div className="movies-cards-list_empty" />);
}

export default MoviesCardList;

// {
//   (ARR_LENGTH >= 12)
//   && <button className="show-more-button button-hover" type="button">Еще</button>
// }
