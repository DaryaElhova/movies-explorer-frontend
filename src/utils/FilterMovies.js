import { SHORTS } from '../utils/constants';

export function FilterMovies(movies, searchKeywords, isShortFilm) {
  let filteredMovies = movies;

  if (searchKeywords !== '') {
    filteredMovies = filteredMovies.filter(item => item.nameRU.toLowerCase().includes(searchKeywords.toLowerCase()))
  }

  if (isShortFilm) {
    filteredMovies = filteredMovies.filter(item => item.duration <= SHORTS);
  }
  return filteredMovies

}