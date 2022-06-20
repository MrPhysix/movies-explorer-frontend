import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

// import cardListHandle from '../../utils/cardListHandle';

const isLoading = !true;

function MoviesCardList({ inSavedMovies, movies, notFound }) {
  // useEffect(() => {
  //   getCards();
  //   console.log(movies);
  // }, []);

  // function showMoreCards() {
  //   const newArr = cardListHandle(ARR_LENGTH);
  //   setMovies([...movies, ...newArr]);
  // }
  //
  // useEffect(() => {
  //   setMovies(cardListHandle(ARR_LENGTH));
  // }, [ARR_LENGTH]);

  if (isLoading) {
    return (<Preloader style={{ minHeight: '50vh' }} />);
  }
  if (notFound) {
    return (<div>NotFound</div>);
  }

  return (
    movies
      && (
      <ul className="movies-cards-list">
        {
          movies.map((item, i) => (
            <MoviesCard
              key={i}
              item={item}
              inSavedMovies={inSavedMovies}
            />
          ))
        }
      </ul>
      )
  );
}

export default MoviesCardList;

// {
//   (ARR_LENGTH >= 12)
//   && <button className="show-more-button button-hover" type="button">Еще</button>
// }
