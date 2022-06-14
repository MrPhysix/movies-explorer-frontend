import React, { useState } from 'react';
import {
  Routes, Route, Navigate, useNavigate,
} from 'react-router-dom';
import './App.css';
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
  const [isLogged, setIsLogged] = useState(true);
  // auth handlers
  const handleLogOut = () => {
    setIsLogged(false);
    navigate('/');
    console.log('out');
  };

  const handleLogIn = () => {
    setIsLogged(true);
    console.log('in');
  };

  return (
    <>
      {
        !pageNotFound && !pageLogin && !pageRegister
        && <Header isLogged={isLogged} handleLogIn={handleLogIn} />
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
          element={
          !isLogged
            ? <Main />
            : <Navigate to="/movies" />
        }
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
          element={<Profile handleLogOut={handleLogOut} />}
        />
      </Routes>
      {!pageNotFound && !pageProfile && <Footer />}
      <ScrollUpButton menuScrolled />
    </>
  );
}

export default App;
