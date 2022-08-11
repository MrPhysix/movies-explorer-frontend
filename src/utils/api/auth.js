const authConfig = {
  baseUrl: 'https://api.mr-movies.nomoredomains.xyz',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getToken() {
    return localStorage.getItem('jwt');
  }

  _getHeaders() {
    return {
      ...this._headers,
      Authorization: `${this._getToken()}`,
    };
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    const err = res.json().then((data) => data.message);
    return Promise.reject(new Error(err));
  }

  signUp(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => this._checkResult(res));
  }

  signIn(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ email, password }),
    })
      .then((res) => this._checkResult(res))
      .then((data) => data.token);
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `${token}`,
      },
    })
      .then((res) => this._checkResult(res))
      .then((res) => res)
      .catch((err) => console.log(`checkToken err ${err}`));
  }

  signOut() {
    return fetch(`${this._baseUrl}/logout`, {
      method: 'POST',
      headers: this._getHeaders(),
    })
      .catch((err) => console.log(`signOut err ${err}`));
  }
}
const Auth = new Api(authConfig);
export default Auth;
