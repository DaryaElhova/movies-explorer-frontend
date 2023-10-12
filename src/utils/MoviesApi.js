class MoviesApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _getJson(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка${res.status}`);
  }

  getMovies() {
    return fetch(this._baseUrl, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then(this._getJson)
  }
}

const moviesApi = new MoviesApi(
  "https://api.nomoreparties.co/beatfilm-movies"
);

export default moviesApi;