import React from "react";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { savedMovies } from "../../utils/ArrMovies";

export default function SavedMovies({ isLoggedIn, onOpenMenu }) {
  return(
    <>
      <Header isLoggedIn={isLoggedIn} onOpenMenu={onOpenMenu}/>
      <main className="saved-movies">
        <SearchForm />
        <MoviesCardList movies={savedMovies} />
      </main>
    </>

  )
}