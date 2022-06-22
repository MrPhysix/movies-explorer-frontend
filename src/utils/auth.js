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

  async _checkResult(res) {
    if (res.ok && res.status <= 300) {
      return res.json();
    }
    const err = await res.json().then((data) => data.message);
    return Promise.reject(new Error(err));
  }

  signUp(name, email, password) {
    console.log('sign up');
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => this._checkResult(res))
      .then((res) => res)
      .catch((err) => console.log(`signUp ${err}`));
  }

  signIn(email, password) {
    console.log('signIn');
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    })
      .then((res) => this._checkResult(res))
      .then((data) => data.token)
      .catch((err) => console.log(`signIn ${err}`));
  }

// function checkToken(token) {
//   fetch(`${baseUrl}/users/me`, {
//     method: 'GET',
//     headers: {
//       ...baseHeaders,
//       Authorization: `${token}`,
//     },
//   })
//     .then((res) => _checkResult(res))
//     .then((res) => res)
//     .catch((err) => console.log(`checkToken err ${err}`));
// }
}
const Auth = new Api(authConfig);
export default Auth;
