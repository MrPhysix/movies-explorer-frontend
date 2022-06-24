import React, {
  useCallback, useEffect, useState,
} from 'react';
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
import Popup from '../Popup/Popup';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
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
  // const
  const navigate = useNavigate();
  // states
  const [isLoaded, setIsLoaded] = useState(false);
  // user
  const [userInfo, setUserInfo] = useState({});
  const [signInInfo, setSignInInfo] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState({});
  // handlers
  const handleLoading = () => {
    setIsLoaded(true);
  };

  // __auth
  const handleSignIn = (email, password) => {
    Auth.signIn(email, password)
      .then((token) => {
        if (token) {
          console.log(`signIn data token ${token}`);
          console.log(signInInfo);
          localStorage.setItem('jwt', token);
        }
        navigate('/movies');
        setIsLogged(true);
        setSignInInfo({});
      })
      .catch((err) => new Error(err));
  };

  const handleSignUp = (name, email, password) => {
    Auth.signUp(name, email, password)
      .then(() => {
        setInfoTooltip({ isOpen: true, isFailed: false });
        setSignInInfo({ email, password });
      })
      .catch((err) => {
        setInfoTooltip({ isOpen: true, isFailed: true });
        return new Error(err);
      });
  };
  async function handleLocalStorageAuth() {
    const jwt = localStorage.getItem('jwt');
    const user = await Auth.checkToken(jwt);
    if (!user) return;
    setUserInfo(user);
    setIsLogged(true);
    console.log('user');
    console.log(user);
  }
  // __popups
  const handleCloseAppPopups = () => {
    setInfoTooltip({ isOpen: false, isFailed: null });
  };
  //
  const handleCloseInfoTooltip = useCallback(() => {
    if (infoTooltip.isOpen && !infoTooltip.isFailed) {
      handleSignIn(signInInfo.email, signInInfo.password);
      handleCloseAppPopups();
    }
    handleCloseAppPopups();
  }, [infoTooltip, signInInfo]);

  // effects
  useEffect(() => {
    handleLoading();
  }, []);

  useEffect(() => {
    console.log('userInfo');
    console.log(userInfo);
  }, [userInfo]);

  useEffect(() => {
    handleLocalStorageAuth().then(() => console.log('handleLocalStorageAuth'));
  }, [isLogged]);
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
            element={<Login onSubmit={handleSignIn} />}
          />
        </Routes>
        {!pageNotFound && !pageProfile && !pageLogin && !pageRegister && <Footer />}
        <ScrollUpButton menuScrolled />
        {
          infoTooltip.isOpen
          && (
          <Popup isOpen={infoTooltip.isOpen} handleClose={handleCloseInfoTooltip}>
            <InfoTooltip failed={infoTooltip.isFailed} handleClose={handleCloseInfoTooltip} />
          </Popup>
          )
        }
      </>
    ) : <Preloader />
  );
}

export default App;
