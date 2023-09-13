import React from "react";
import { useLocation } from "react-router-dom";

export default function MoviesCard({
  movie,
  onSaveMovie,
  onDeleteMovie,
  image
 }) {
const location = useLocation();

const formatDuration = (min) => {
  const hours = Math.floor(min/ 60);
  const remainingMin = min % 60;
  if (remainingMin === 0) {
    return `${hours}ч`;
  } else {
    return `${hours}ч ${remainingMin}м`;
  }
};
  const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
  // проверим, есть ли фильм в массиве сохраненных фильмов
  const isSaved = savedMovies ? savedMovies.some((i) => i.movieId === movie.id) : false;
  // ищем элемент у которого movieId = id. Если он есть, вернем элемент
  //и будем удалять по movieSaved._id
  const movieSaved = savedMovies ? savedMovies.find((i) => i.movieId === movie.id) : null;

  const savedButtonClassName = (`movies-card__save ${isSaved ? 'movies-card__save_active' : ''}`)

  return (
    <article className="movies-card">
      <div className="movies-card__info">
        <div className="movies-card__about">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <p className="movies-card__duration">{formatDuration(movie.duration)}</p>
        </div>
        {location.pathname !== '/saved-movies' ? (
          <button
            className={savedButtonClassName}
            type="button"
            onClick={() => onSaveMovie(movie, isSaved, movieSaved)}
          ></button>
        ) : (
          <button
            className="movies-card__delete"
            type="button"
            onClick={() => onDeleteMovie(movie._id)}
          ></button>
        )}
      </div>
      <a
        className="movies-card__trlink"
        href={ movie.trailerLink }
        target="_blank"
        rel="noreferrer"
      >
        <img className="movies-card__poster" src={image} alt={movie.nameRU} />
      </a>

    </article>
  )
}