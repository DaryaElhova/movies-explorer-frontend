import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import ShowMore from "../ShowMore/ShowMore";
import { movies } from '../../utils/ArrMovies';

export default function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList movies={movies}/>
      <ShowMore />
    </main>
  )
}