import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from 'react-router-dom'


export default function MoviesCardList({movies}) {
  const location = useLocation();

  return(
    <section className={`${ location.pathname !== '/saved-movies' ? "movies-card-list" : "saved-movies__container"}`}>
      {movies.map((movie) => {
        return (
          <MoviesCard
            nameRU = {movie.nameRU}
            duration = {movie.duration}
            image = {movie.image}
            />
        )
      })}
    </section>
  )
}