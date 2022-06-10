import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import ScrollUpButton from '../ScrollUpButton/ScrollUpButton';
//
const isLogged = false;

function App() {
  return (
    <>
      <ScrollUpButton menuScrolled />
      <Header isLogged={isLogged} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            isLogged
              ? <Main />
              : <Movies />
        }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
