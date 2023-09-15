import React from 'react';
import './App.css';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import NavMenu from '../NavMenu/NavMenu';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';

import api from '../../utils/MainApi';
import * as Auth from '../../utils/Auth';
import moviesApi from '../../utils/MoviesApi';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { FilterMovies } from '../../utils/FilterMovies';

function App() {

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  // стейсты для фильмов
  const [movies, setMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [isSavedMoviesPage, setIsSavedMoviesPage] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isShortMovieChecked, setIsShortMovieChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api.getUserInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(`Возникла ошибка, ${err}`) 
      })
    }
  }, [isLoggedIn])

  // РEГИСТРАЦИЯ И АВТОРИЗАЦИЯ----------------
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      Auth.checkToken(jwt)
        .then((res) => { 
          if(res) {
            // const userData = {
            //   name: res.name,
            //   email: res.email
            // }
            
            //setCurrentUser(userData);
            setIsLoggedIn(true);
            navigate(location.pathname);
          }
        })
        .catch((err) => {
          console.log(`Произошла ошибка ${err}`);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        })
    } else {
      setIsLoading(false);
    }
  }, []);

  const registerUser = ({ name, email, password }) => {
    Auth
      .registration(name, email, password)
      .then((res) => {
        if (res.status === 409) {
          throw new Error("Конфликт");
        }
        loginUser({email, password})
        })
      .catch(() => {

        if ({"message":"Такой пользователь уже существует"}) {
          // Обработка ошибки 409 (конфликт)
          setErrorMessage("Пользователь с таким email уже существует.");
        } else {
          // Другие ошибки
          setErrorMessage("При регистрации пользователя произошла ошибка");
        }
      });
  };

  const loginUser = ({ email, password }) => {
    Auth.authorization(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        navigate("/movies", { replace: true });
      })
      .catch(() => {
        if ({"message":"Неправильная почта или пароль"}) {
          setErrorMessage(" Вы ввели неправильный логин или пароль.");
        } else {
          // Другие ошибки
          setErrorMessage("При авторизации произошла ошибка. Токен не передан или передан не в том формате");
        }
      });
  };

  // ОБНОВЛЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ------------
  function handleUpdateUser(userData) {
    api
      .updateUserInfo(userData.name, userData.email)
      .then((res) => {
        setCurrentUser(res);
        setSuccessMessage("Информация успешно обновлена!")
      })
      .catch(() => {
        if ({"message":"Такой пользователь уже существует"}) {
          // Обработка ошибки 409 (конфликт)
          setErrorMessage("Пользователь с таким email уже существует.");
        } else {
          // Другие ошибки
          setErrorMessage("При регистрации пользователя произошла ошибка");
        }
      })
  }


  // ВЫХОД ИЗ ПРОФИЛЯ
  const logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("searchQuery");
    localStorage.removeItem("isShortMovieChecked");
    localStorage.removeItem("searchResults");
    setIsLoggedIn(false);
    setCurrentUser({});
  }

  // текущий маршрут
  const location = useLocation();
  useEffect(() => {
    setIsSavedMoviesPage(location.pathname === '/saved-movies');
  }, [location.pathname]);

  // ЗАГРУЗКА ФИЛЬМОВ + ПРОВЕРКА НА НАЛИЧИЕ В LOCALSTORAGE
  useEffect(() => {
    if (isLoggedIn) {
      const storedMovies = localStorage.getItem('movies');
      setVisibleMovies(getMoviesPerPage())

      if(storedMovies) {
        setMovies(JSON.parse(storedMovies));
        setVisibleMovies(getMoviesPerPage());
      } else {
        moviesApi.getMovies()
          setIsLoading(true)
          .then((movies) => {
            setMovies(movies);
            localStorage.setItem('movies', JSON.stringify(movies));
            setVisibleMovies(getMoviesPerPage());
          })
          .catch((err) => {
            console.log(`Произошла ошибка ${err}`)
          })
          .finally(() => {
            setIsLoading(false);
          })
      }
    }
  }, [isLoggedIn]);

  //ЗАГРУЗКА ФИЛЬМОВ НА РОУТ /SAVED-MOVIES------------
  useEffect(() => {
    if (isSavedMoviesPage) {
      const storedSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
      if(storedSavedMovies) {
        setSavedMovies(storedSavedMovies);
      }
      setSearchQuery('');
      setIsShortMovieChecked(false);
      setSearchResults([]); // Очищаем результаты поиска
      setIsSearching(false); // Устанавливаем флаг поиска в false
    }
  }, [isSavedMoviesPage])

  // КОЛИЧЕСТВО ФИЛЬМОВ ДЛЯ ДОП ЗАГРУЗКИ---------------
  const getAdditionalMovies = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 769) {
        return 3; 
      } else {
        return 2;
      }
  };

  //ПОКАЗАТЬ БОЛЬШЕ ФИЛЬМОВ--------------
  const handleShowMoreClick = () => {
    const showCardCount = getAdditionalMovies();
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + showCardCount);
  };

  //ОБРАБОТЧИК ИЗМЕНЕНИЯ РАЗМЕРА ОКНА--------------------
  useEffect(() => {
    const handleResize = () => {
      setVisibleMovies(getMoviesPerPage());
    }

    window.addEventListener('resize', handleResize);

    //убрать обработчик при размонтировании
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // ОПРЕДЕЛЕНИЕ КОЛИЧЕСТВА ОТОБРАЖАЕМЫХ ФИЛЬМОВ---------------
  const getMoviesPerPage = () => {
    if (window.innerWidth > 768) {
      return 12;
    } else if (window.innerWidth > 320) {
    return 8;
    } else {
    return 5;
  }
};

const handleSetSavedMovies = (newSavedMovies) => {
  setSavedMovies(newSavedMovies);
};

  // СОХРАНЕНИЕ ФИЛЬМА-----------------
  const handleSaveMovie = (movie, isSaved, movieSaved) => {
    if (isSaved) {
      handleDeleteMovie(movieSaved._id);
    } else {
      api.saveMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, res]);//добавить к сущ.массиву
        localStorage.setItem('savedMovies', JSON.stringify([...savedMovies, res]));
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`)
      })
    }
  };

  //УДАЛЕНИЕ ФИЛЬМА ------------------------
  const handleDeleteMovie = (id) => {
    api.deleteMovie(id)
    .then((res) => {
      const updatedSavedMovies = savedMovies.filter((movie) => movie._id !== id);
      setSavedMovies(updatedSavedMovies);
      // обновить localStorage
      localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
    })
    .catch((err) => {
      console.log(`Произошла ошибка ${err}`)
    });
  };

  // ПОИСК ФИЛЬМОВ-------------------------
  const handleSearch = (searchKeywords, isShortMovieChecked) => {
    setIsLoading(true);
    setNoResults(false);

    if (isSavedMoviesPage) {
      const filteredSavedMovies = FilterMovies(savedMovies, searchKeywords, isShortMovieChecked);
      
      setSearchResults(filteredSavedMovies);
      setIsLoading(false);
      setNoResults(filteredSavedMovies.length === 0);
    } else {
      const filteredMovies = FilterMovies(movies, searchKeywords, isShortMovieChecked);

        // Сохранение данных в localStorage
      localStorage.setItem('searchQuery', searchKeywords);
      localStorage.setItem('isShortMovieChecked', isShortMovieChecked);
      localStorage.setItem('searchResults', JSON.stringify(filteredMovies));

      setSearchQuery(searchKeywords);
      setIsShortMovieChecked(isShortMovieChecked);
      setSearchResults(filteredMovies);
      setIsLoading(false);
      setNoResults(filteredMovies.length === 0);
    }
    setIsSearching(true);
  }


  function handleMenuOpen() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <> 
    {isLoading ? (<Preloader />) : (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route 
          path="/movies"
          element={
            <ProtectedRoute
              path="/movies"
              isLoggedIn={ isLoggedIn }
              component={ Movies }
              onOpenMenu={ handleMenuOpen }
              movies= {movies}
              savedMovies = {savedMovies}
              visibleMovies={ visibleMovies }
              onShowMoreClick={ handleShowMoreClick }
              onSaveMovie={handleSaveMovie}
              onDeleteMovie={ handleDeleteMovie}
              onSearch={ handleSearch}
              isLoading={isLoading}
              noResults={noResults}
              isSavedMoviesPage={ false }
              setIsShortMovieChecked={setIsShortMovieChecked}
              setSearchQuery={setSearchQuery}
              setIsSearching={setIsSearching}
              setSearchResults={setSearchResults}
              isSearching={isSearching}
              isShortMovieChecked={isShortMovieChecked}
              searchResults={searchResults}
              searchQuery={searchQuery} // Передаем searchQuery как пропс
             /> }
        />

        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute 
              path="/saved-movies"
              isLoggedIn={ isLoggedIn }
              component={ SavedMovies }
              onOpenMenu={ handleMenuOpen }
              savedMovies={savedMovies}
              onSearch={ handleSearch}
              onDeleteMovie={handleDeleteMovie}
              isSearching={isSearching}
              searchResults={searchResults}
              visibleMovies={ visibleMovies }
              isSavedMoviesPage = { true }
              setSavedMovies={handleSetSavedMovies}
              isLoading={ isLoading }
              noResults={ noResults }
              onShowMoreClick={ handleShowMoreClick }
              isShortMovieChecked={isShortMovieChecked}
              setIsShortMovieChecked={setIsShortMovieChecked}
              setSearchQuery={setSearchQuery}
            /> }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute 
              path="/profile"
              isLoggedIn={ isLoggedIn }
              component={ Profile }
              logOut={ logOut }
              onUpdateUser={ handleUpdateUser}
              //userData={ userData }
              errorMessage={ errorMessage }
              successMessage={ successMessage }
            />} />

          <Route
            path="/signin"
            element={<Login loginUser={loginUser} errorMessage={errorMessage}/> } />
          <Route
            path="/signup"
            element={<Register registerUser={registerUser} errorMessage={errorMessage}/>} />
          <Route
            path="*"
            element={<NotFound />} />
      </Routes>
      <Footer />
      <NavMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </div>
    </CurrentUserContext.Provider>
    )}
  </>
)}

export default App;
