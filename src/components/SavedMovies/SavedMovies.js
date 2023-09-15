import React from "react";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies({ 
  isLoggedIn,
  onOpenMenu,
  savedMovies,
  onSearch,
  onDeleteMovie,
  isSearching,
  searchResults,
  visibleMovies,
  isSavedMoviesPage,
  isLoading,
  noResults,
  onShowMoreClick,
  isShortMovieChecked,
  setIsShortMovieChecked
}) {
  const handleSearchSubmit = (searchKeywords, isShortFilm) => {
    onSearch(searchKeywords, isShortFilm);
  }

  return(
    <>
      <Header isLoggedIn={isLoggedIn} onOpenMenu={onOpenMenu}/>
      <main className="saved-movies">
        <SearchForm
          onSearch={handleSearchSubmit}
          isShortMovieChecked={isShortMovieChecked}
          setIsShortMovieChecked={setIsShortMovieChecked}
          isSavedMoviesPage={isSavedMoviesPage}
           />
        {isLoading ? (<Preloader />) : noResults? (<p>Ничего не найдено</p>) : (
          <MoviesCardList 
            movies={isSearching ? searchResults : savedMovies}
            onDeleteMovie={onDeleteMovie}
            visibleMovies={visibleMovies}
            isSavedMoviesPage={ isSavedMoviesPage }
            onShowMoreClick={onShowMoreClick}/>
        )}
      </main>
    </>
  )
}