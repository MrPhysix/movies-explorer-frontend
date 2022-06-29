const apiConfig = {
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
};

class Api {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  _checkResult = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  };

  async getInitialCards() {
    return fetch(`${this._url}`)
      .then((res) => this._checkResult(res))
      .then((res) => res);
  }
}

const MoviesApi = new Api(apiConfig);
export default MoviesApi;
