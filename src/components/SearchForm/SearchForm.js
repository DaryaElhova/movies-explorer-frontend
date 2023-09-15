import icon from '../../images/search-icon.svg';
import React from 'react';
import { useRef } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({
  onSearch,
  isShortMovieChecked,
  setIsShortMovieChecked,
  searchQuery,
  setSearchQuery,
  isSavedMoviesPage }) {
  const searchKeywordsRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchKeywords = searchKeywordsRef.current.value;
    onSearch(searchKeywords, isShortMovieChecked);
  }

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsShortMovieChecked(isChecked);
    onSearch(searchKeywordsRef.current.value, isChecked);
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value); // Обновляем searchQuery в state
  };

  const inputProps = isSavedMoviesPage
    ? {} // Пустые свойства, если находимся на странице SavedMovies
    : {
        value: searchQuery || "",
        onChange: handleInputChange,
      };

  return (
    <section className="search">
      <form className="search__form" onSubmit={ handleSubmit } >
        <div className="search__container">
          <img className="search__icon" src={icon} alt="искать"/>
          <input
            className="search__input"
            placeholder="Фильм"
            name="searchInput"
            ref={searchKeywordsRef}
            {...inputProps}
            ></input>
          <button className="search__button" title="найти">
          </button>
        </div>
      </form>
      <FilterCheckbox isShortMovieChecked={isShortMovieChecked} onCheckboxChange={handleCheckboxChange}/>
    </section>
  )
}