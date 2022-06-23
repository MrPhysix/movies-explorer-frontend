import React, { useEffect, useState } from 'react';
import {
  Routes, Route, Navigate, useNavigate,
} from 'react-router-dom';
import './App.css';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import ScrollUpButton from '../ScrollUpButton/ScrollUpButton';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import usePage from '../../hooks/usePage';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Auth from '../../utils/api/auth';
//
function App() {
  // routes etc
  const [
    pageNotFound,
    pageProfile,
    pageLogin,
    pageRegister,
  ] = [
    usePage('/404'),
    usePage('/profile'),
    usePage('/signin'),
    usePage('/signup'),
  ];
  const navigate = useNavigate();

  // states
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  // handlers
  const handleLoading = () => {
    setIsLoaded(!isLoaded);
  };
  const handleSignUp = (name, email, password) => {
    console.log(name);
    console.log(email);
    console.log(password);
    Auth.signUp(name, email, password)
      .then((res) => {
        navigate('/signin');
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  // effects
  useEffect(() => {
    handleLoading();
  }, []);

  // auth
  // const token = handleSignIn('yandex_qu228@yandex.ru', '123');
  // console.log(token);
  return (
    isLoaded ? (
      <>
        {
        !pageNotFound && !pageLogin && !pageRegister
        && <Header isLogged={isLogged} />
      }
        <Routes>
          <Route
            path="/*"
            element={<Navigate to="/404" replace />}
          />
          <Route
            path="/404"
            element={<NotFoundPage />}
          />
          <Route
            exact
            path="/"
            element={<Main />}
          />
          <Route
            path="/movies"
            element={(
              <ProtectedRoute isLogged={isLogged}>
                <Movies />
              </ProtectedRoute>
        )}
          />
          <Route
            path="/saved-movies"
            element={(
              <ProtectedRoute isLogged={isLogged}>
                <SavedMovies />
              </ProtectedRoute>
        )}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/signup"
            element={<Register onSubmit={handleSignUp} />}
          />
          <Route
            path="/signin"
            element={<Login />}
          />
        </Routes>
        {!pageNotFound && !pageProfile && !pageLogin && !pageRegister && <Footer />}
        <ScrollUpButton menuScrolled />
      </>
    ) : <Preloader />
  );
}

export default App;
