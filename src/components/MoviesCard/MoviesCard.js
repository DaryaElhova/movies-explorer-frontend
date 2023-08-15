import React from "react";
import { useLocation } from "react-router-dom";

export default function MoviesCard(movie) {
const location = useLocation();

  return (
    <div className="movies-card">
      <div className="movies-card__info">
        <div className="movies-card__about">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <p className="movies-card__duration">{movie.duration}</p>
        </div>
        <button className={`${ location.pathname !== '/saved-movies' ? "movies-card__save" : "movies-card__delete"}`}></button>
      </div>
      <img className="movies-card__poster" src={movie.image} alt={movie.nameRU}></img>
    </div>
  )
}