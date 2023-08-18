import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import ShowMore from "../ShowMore/ShowMore";
import Header from "../Header/Header";
import { movies } from '../../utils/ArrMovies';

export default function Movies(props) {
  const { isLoggedIn, onOpenMenu } = props;

  return (
    <>
    <Header isLoggedIn={isLoggedIn} onOpenMenu={ onOpenMenu }/>
    <main className="movies">
      <SearchForm />
      <MoviesCardList movies={movies}/>
      <ShowMore />
    </main>
    </>
  )
}