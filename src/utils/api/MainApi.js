const apiConfig = {
  jwt: localStorage.getItem('jwt'),
  baseUrl: 'https://api.mr-movies.nomoredomains.xyz',
  moviesUrl: 'https://api.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
};

class Api {
  constructor({
    baseUrl, moviesUrl,
    headers, jwt,
  }) {
    this._baseUrl = baseUrl;
    this._moviesUrl = moviesUrl;
    this._headers = headers;
    this._jwt = jwt;
  }

  async _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    const err = await res.json().then((data) => data.message);
    console.log(err);
    console.log(res);
    return Promise.reject(new Error(err));
  }

  _getHeaders() {
    return {
      ...this._headers,
      Authorization: `${this._jwt}`,
    };
  }

  // user
  updateUser(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        email,
      }),
    })
      .then((res) => this._checkResult(res))
      .then((res) => res);
  }

  // movies
  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._getHeaders(),
    })
      .then((res) => this._checkResult(res));
  }

  createSavedMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: this._moviesUrl + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: this._moviesUrl + movie.image.formats.thumbnail.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    })
      .then((res) => this._checkResult(res))
      .catch((err) => console.log(err));
  }

  removeSavedMovie(movieId) {
    console.log(movieId);
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
      .then((res) => this._checkResult(res))
      .catch((err) => console.log(err));
  }
}

const MainApi = new Api(apiConfig);
export default MainApi;

// // test
// async getMovies() {
//   return fetch('https://api.mr-movies.nomoredomains.xyz/movies')
//     .then((res) => this._checkResult(res));
// }
//
// //
//
// async createCard({
//   country, director, duration, year, description,
//   image, trailerLink, thumbnail, movieId, nameRU,
//   nameEN,
// }) {
//   return fetch(`${this._url}`, {
//     method: 'POST',
//     headers: this._headers,
//     body: JSON.stringify({
//       country,
//       director,
//       duration,
//       year,
//       description,
//       image,
//       trailerLink,
//       thumbnail,
//       movieId,
//       nameRU,
//       nameEN,
//     }),
//   })
//     .then((res) => this._checkResult(res));
// }
