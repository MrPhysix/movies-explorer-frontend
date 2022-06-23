import Auth from './api/auth';

export function handleSignIn(email, password) {
  Auth
    .signIn(email, password)
    .then((token) => {
      localStorage.setItem('jwt', token.toString());
      return token;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function handleSignUp(name, email, password) {
  return Auth
    .signUp(name, email, password)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}
