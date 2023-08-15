import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { savedMovies } from "../../utils/ArrMovies";

export default function SavedMovies() {
  return(
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={savedMovies} />
    </section>
  )
}