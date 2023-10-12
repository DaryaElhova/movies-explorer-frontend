import { movieUrl } from "./constants";

class MainApi{
  constructor(baseUrl){
    this._baseUrl = baseUrl;
  }

  // чтобы не дублировать заголовки
  _getHeaders(){
    return {
      "Content-Type" : "application/json",
      authorization: `Bearer ${ localStorage.getItem('jwt') }`
    }
  }
  // не дублировать код на проверку запроса
  _getJson(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка${res.status}`);
  }

  // получение информации о пользователе с сервера
  getUserInfo(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._getJson)
  }

  //редактирование данных профиля
  updateUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        email: email
      })
    }).then(this._getJson)
  }

  //получить сохраненные фильмы
  getSavedMovies(){
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._getHeaders()
    }).then(this._getJson)
  }

  // сохранить фильм
  saveMovie(movie){
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${movieUrl}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `${movieUrl}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id
      })
    }).then(this._getJson)
  }

  // удалить фильма by id
  deleteMovie(id){
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJson)
  }
}

const api = new MainApi(
  "https://api.movies.elkhova.nomoreparties.co"
);

export default api;




