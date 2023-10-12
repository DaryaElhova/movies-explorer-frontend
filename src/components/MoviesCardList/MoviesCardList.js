import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import ShowMore from "../ShowMore/ShowMore";

import { useLocation } from 'react-router-dom';
import { movieUrl } from "../../utils/constants";


export default function MoviesCardList({ 
  movies,
  visibleMovies,
  onSaveMovie,
  onDeleteMovie,
  savedMovies,
  isLoading,
  onShowMoreClick,
  isSavedMoviesPage
 }) {
  const location = useLocation();
  const sectionClassName = (`${ location.pathname !== '/saved-movies' ? "movies-card-list__container" : "saved-movies__container"}`);

  return(
    <section className="movies-card-list">
      <div className={sectionClassName}>
      {movies.slice(0, visibleMovies).map((movie) => {
        const imageProp = location.pathname !== '/saved-movies' ? `${movieUrl}${movie.image.url}` : movie.image;

        return (
          <MoviesCard
            savedMovies={savedMovies}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
            movie= {movie}
            key={movie.id}
            nameRU = {movie.nameRU}
            duration = {movie.duration}
            image = {imageProp}
            />)
      })}
      </div>
      {!isSavedMoviesPage ? (<div className="movies-card-list__show-more">
      {isLoading ? (
    <Preloader />
      ) : (
      visibleMovies < movies.length && (
        <ShowMore
        onShowMoreClick={onShowMoreClick}
 />
      )
    )}
      </div>) : ''}
    </section>

  )
}