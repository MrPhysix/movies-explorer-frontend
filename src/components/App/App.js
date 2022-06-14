import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import ScrollUpButton from '../ScrollUpButton/ScrollUpButton';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import usePageNotFound from '../../hooks/usePageNotFound';
//

function App() {
  const pageNotFound = usePageNotFound();
  const isLogged = true;

  return (
    <>
      <ScrollUpButton menuScrolled />
      {!pageNotFound && <Header isLogged={isLogged} />}
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
      </Routes>
      {!pageNotFound && <Footer />}
    </>
  );
}

export default App;
