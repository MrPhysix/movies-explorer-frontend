import MainApi from './MainApi';

const apiConfig = {
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  getSavedMovies: MainApi.getSavedMovies(),
};

class Api {
  constructor({ baseUrl, getSavedMovies }) {
    this._url = baseUrl;
    this._getSavedMovies = getSavedMovies;
  }

  _checkResult = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  };

  async getInitialCards() {
    const saved = await this._getSavedMovies;
    console.log(saved);
    return fetch(`${this._url}`)
      .then((res) => this._checkResult(res));
  }
}

const MoviesApi = new Api(apiConfig);
export default MoviesApi;
