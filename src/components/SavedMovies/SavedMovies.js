import React from "react";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import { useState, useEffect } from "react";

export default function SavedMovies({ 
  isLoggedIn,
  onOpenMenu,
  savedMovies,
  onSearch,
  onDeleteMovie,
  isSearching,
  searchResults,
  isSavedMoviesPage,
  isLoading,
  noResults,
  isShortMovieChecked,
  setIsShortMovieChecked
}) {
  const [currentSearchResults, setCurrentSearchResults] = useState([]);

  const handleSearchSubmit = (searchKeywords, isShortFilm) => {
    onSearch(searchKeywords, isShortFilm);
  }

  useEffect(() => {
    if (isSearching) {
      setCurrentSearchResults(searchResults);
    } else {
      setCurrentSearchResults(savedMovies);
    }
  }, [isSearching, searchResults, savedMovies]);

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
            movies={isSearching ? currentSearchResults : savedMovies}
            onDeleteMovie={onDeleteMovie}
            isSavedMoviesPage={ isSavedMoviesPage }
<<<<<<< HEAD
            onShowMoreClick={onShowMoreClick}
=======
>>>>>>> updateuser
            />
        )}
      </main>
    </>
  )
}