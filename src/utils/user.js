import Auth from './api/auth';

export function handleSignIn(email, password) {
  Auth
    .signIn(email, password)
    .then((token) => {
      localStorage.setItem('jwt', token.toString());
      return token;
    })
    .catch((err) => new Error(err));
}

export function handleSignUp(name, email, password) {
  return Auth
    .signUp(name, email, password)
    .then((res) => res)
    .catch((err) => new Error(err));
}
