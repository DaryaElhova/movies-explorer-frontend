import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import { useEffect, useState } from "react";

export default function Movies({
  isLoggedIn,
  onOpenMenu,
  movies,
  visibleMovies,
  onSearch,
  isSearching,
  searchResults,
  onSaveMovie,
  onDeleteMovie,
  isLoading,
  noResults,
  savedMovies,
  onShowMoreClick,
  isShortMovieChecked,
  setIsShortMovieChecked,
  setSearchQuery,
  setSearchResults,
  setIsSearching,
  searchQuery,searchExecuted, setSearchExecuted, setVisibleMovies, getMoviesPerPage

  }) {

    const [restoredData, setRestoredData] = useState(false);

    useEffect(() => {
      // Восстановление данных из localStorage при монтировании компонента
      const savedSearchQuery = localStorage.getItem('searchQuery');
      const savedIsShortMovieChecked = localStorage.getItem('isShortMovieChecked');
      const savedSearchResults = JSON.parse(localStorage.getItem('searchResults'));
      console.log(savedSearchQuery);
  
      if (savedSearchQuery  && savedSearchResults) {
        setSearchQuery(savedSearchQuery);
        setSearchResults(savedSearchResults);
        setIsSearching(true);
        setRestoredData(true); // Устанавливаем флаг, что данные восстановлены
        setSearchExecuted(true);

        const loadedMovies = isSearching ? savedSearchResults : movies;
        const moviesPerPage = getMoviesPerPage();
        setVisibleMovies(loadedMovies.length > moviesPerPage ? moviesPerPage : loadedMovies.length);
      }

      //чтобы восстановить состояние чекбокса
      if (savedIsShortMovieChecked === 'true') {
        setIsShortMovieChecked(true);
      } else {
        setIsShortMovieChecked(false);
      }

    }, [isSearching]);

  const handleSearchSubmit = (searchKeywords, isShortFilm) => {
    onSearch(searchKeywords, isShortFilm);
    
    if (!restoredData) {
      // Сохранение данных поиска в localStorage только если они не были восстановлены
      localStorage.setItem('searchQuery', searchKeywords);
      localStorage.setItem('isShortMovieChecked', isShortFilm.toString());
    }
  };

  console.log(visibleMovies);

  return (
    <>
    <Header isLoggedIn={isLoggedIn} onOpenMenu={ onOpenMenu }/>
    <main className="movies">
      <SearchForm
        onSearch={handleSearchSubmit}
        isShortMovieChecked={isShortMovieChecked}
        setIsShortMovieChecked={setIsShortMovieChecked}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        />
      {isLoading ? (<Preloader />) : !searchExecuted ? null : noResults ? (<p>Ничего не найдено</p>) : (
        <MoviesCardList 
        movies={isSearching ? searchResults : movies}
        visibleMovies={visibleMovies}
        onSaveMovie={onSaveMovie}
        savedMovies={savedMovies}
        onDeleteMovie={onDeleteMovie}
        onShowMoreClick={onShowMoreClick} />
      )}
    </main>
    </>
  )
}