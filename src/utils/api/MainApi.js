const apiConfig = {
  jwt: localStorage.getItem('jwt'),
  baseUrl: 'https://api.mr-movies.nomoredomains.xyz',
  headers: {
    Authorization: `${this.jwt}`,
    'Content-Type': 'application/json',
  },
};

class Api {
  constructor({ baseUrl, headers, jwt }) {
    this._url = `${baseUrl}/movies`;
    this._headers = headers;
    this._jwt = jwt;
  }

  _checkResult = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  };

  _getToken() {
    this._jwt = localStorage.getItem('jwt');
  }

  _getHeaders() {
    return {
      ...this._headers,
      Authorization: `${this._jwt}`,
    };
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
