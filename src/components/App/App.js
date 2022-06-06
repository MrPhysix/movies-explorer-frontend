import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ScrollUpButton from '../ScrollUpButton/ScrollUpButton';

function App() {
  return (
    <>
      <ScrollUpButton menuScrolled />
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
