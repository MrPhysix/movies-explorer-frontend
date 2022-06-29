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
// import SavedMovies from '../SavedMovies/SavedMovies';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import usePage from '../../hooks/usePage';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Popup from '../Popup/Popup';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
//
import Auth from '../../utils/api/auth';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import MainApi from '../../utils/api/MainApi';
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
  const [isLoading, setIsLoading] = useState(true);
  // user
  const [currentUser, setCurrentUser] = useState({});
  const [signInInfo, setSignInInfo] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState({});
  // movies
  const [savedMovies, setSavedMovies] = useState([]);

  // handlers
  const handleLoading = () => {
    setIsLoading(false);
  };

  // __auth
  async function handleLocalStorageAuth() {
    const jwt = localStorage.getItem('jwt');
    const user = jwt && await Auth.checkToken(jwt);
    if (!user) return;
    setCurrentUser(user);
    setIsLogged(true);
  }

  const handleSignIn = (email, password) => {
    setIsLoading(true);
    Auth.signIn(email, password)
      .then((token) => {
        if (token) {
          console.log(`signIn data token ${token}`);
          console.log(signInInfo);
          localStorage.setItem('jwt', token);
        }
        handleLocalStorageAuth();
      }).then(() => {
        setIsLogged(true);
        setSignInInfo({});
        navigate('/movies');
      })
      .catch((err) => {
        setInfoTooltip({ isOpen: true, isFailed: true });
        return new Error(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleSignUp = (name, email, password) => {
    setIsLoading(true);
    Auth.signUp(name, email, password)
      .then(() => {
        setInfoTooltip({ isOpen: true, isFailed: false });
        setSignInInfo({ email, password });
      })
      .catch((err) => {
        setInfoTooltip({ isOpen: true, isFailed: true });
        return new Error(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleLogOut = () => {
    setIsLoading(true);
    Auth.signOut()
      .then(() => {
        setIsLogged(false);
        localStorage.clear();
        setCurrentUser({});
        setSavedMovies([]);
      })
      .finally(() => {
        setIsLoading(false);
        console.log('navigated');
        navigate('/');
      });
  };
  // __user
  const handleUpdateUser = (name, email) => {
    setIsLoading(true);
    MainApi.updateUser(name, email)
      .then((res) => {
        setCurrentUser((prev) => ({ ...prev, ...res }));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // __movies
  async function getSavedMovies() {
    const movies = await MainApi.getSavedMovies();
    setSavedMovies(movies);
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
    if (isLogged) getSavedMovies();
  }, [isLogged]);

  useEffect(() => {
    if (!isLogged) handleLocalStorageAuth();
  }, [isLogged]);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      {!isLoading ? (
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
                  <Movies savedMovies={savedMovies} setSavedMovies={setSavedMovies} />
                </ProtectedRoute>
              )}
            />
            {/* <Route */}
            {/*  path="/saved-movies" */}
            {/*  element={( */}
            {/*    <ProtectedRoute isLogged={isLogged}> */}
            {/*      <SavedMovies savedMovies={savedMovies} setSavedMovies={setSavedMovies} /> */}
            {/*    </ProtectedRoute> */}
            {/*  )} */}
            {/* /> */}
            <Route
              path="/profile"
              element={(
                <ProtectedRoute isLogged={isLogged}>
                  <Profile
                    onLogOut={handleLogOut}
                    onSubmit={handleUpdateUser}
                  />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/signup"
              element={<Register onSubmit={handleSignUp} isLoading={isLoading} />}
            />
            <Route
              path="/signin"
              element={<Login onSubmit={handleSignIn} isLoading={isLoading} />}
            />
          </Routes>
          {!pageNotFound && !pageProfile && !pageLogin && !pageRegister && <Footer />}
          <ScrollUpButton menuScrolled />
          <Popup isOpen={infoTooltip.isOpen} handleClose={handleCloseInfoTooltip}>
            <InfoTooltip failed={infoTooltip.isFailed} handleClose={handleCloseInfoTooltip} />
          </Popup>
        </>
      ) : <Preloader style={{ width: '100vw', height: '100vh' }} />}
    </CurrentUserContext.Provider>
  );
}

export default App;
