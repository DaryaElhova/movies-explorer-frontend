import React from 'react';
import { Navigate } from 'react-router-dom';
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
  const [searchExecuted, setSearchExecuted] = useState(false);//был ли поиск

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Устанавливаем CURRENT USER
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
        if (res) {
          console.log(res);
          setIsLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          navigate("/movies", { replace: true });
        } else {
          // Handle the case where res is undefined or unexpected
          setErrorMessage("Вы ввели неправильный логин или пароль.");
        }
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
    localStorage.removeItem("movies");
    setIsLoggedIn(false);
    setCurrentUser({});
    setMovies([]);
    setSearchQuery('');
    setIsShortMovieChecked(false);
    setSearchExecuted(false)
  }

  // текущий маршрут
  const location = useLocation();
  useEffect(() => {
    setIsSavedMoviesPage(location.pathname === '/saved-movies');
  }, [location.pathname]);

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
    } else if (window.innerWidth > 480) {
    return 8;
    } else if (window.innerWidth <= 480){
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
        // Удаление фильма из состояния savedMovies
        const updatedSavedMovies = savedMovies.filter((movie) => movie._id !== id);
        setSavedMovies(updatedSavedMovies);
      
        // Удаление фильма из состояния searchResults
        const updatedSearchResults = searchResults.filter((movie) => movie._id !== id);
        setSearchResults(updatedSearchResults);
        // Обновить localStorage только после успешного удаления на сервере
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
        const movieToRestore = savedMovies.find((movie) => movie._id === id);
        if (movieToRestore) {
          setSavedMovies([...savedMovies, movieToRestore]);
        }
        const searchResultToRestore = searchResults.find((movie) => movie._id === id);
        if (searchResultToRestore) {
          setSearchResults([...searchResults, searchResultToRestore]);
        }
      });
  };
  
    // ЗАГРУЗКА ФИЛЬМОВ + ПРОВЕРКА НА НАЛИЧИЕ В LOCALSTORAGE
    const loadMovies = () => {
      return new Promise((resolve, reject) => {
        if (isLoggedIn && searchExecuted) {
          const storedMovies = localStorage.getItem('movies');
          setVisibleMovies(getMoviesPerPage())
      
          if(storedMovies) {
            const parsedMovies = JSON.parse(storedMovies);
            setMovies(parsedMovies);
            setVisibleMovies(getMoviesPerPage());
            resolve(parsedMovies);
          }

        }
        else {
          moviesApi.getMovies()
            .then((movies) => {
              setIsLoading(false);
              setMovies(movies);
              localStorage.setItem('movies', JSON.stringify(movies));
              setVisibleMovies(getMoviesPerPage());
              resolve(movies);
            })
            .catch((err) => {
              console.log(`Произошла ошибка ${err}`)
              reject(err); 
            })
            .finally(() => {
              setIsLoading(false);
            })
        }
      })
    }

    //ПОИСК ФИЛЬМА-----------------------------------------
    const handleSearch = (searchKeywords, isShortMovieChecked) => {
      setNoResults(false);
      setIsLoading(true);
      
      if (isSavedMoviesPage) {
        const filteredSavedMovies = FilterMovies(savedMovies, searchKeywords, isShortMovieChecked);
        
        setSearchResults(filteredSavedMovies);
        setNoResults(filteredSavedMovies.length === 0);
        setIsLoading(false);
      } else {
        //загружаю+фильтрую обработанные фильмы
        loadMovies()
          .then((loadedMovies) => {
            const filteredMovies = FilterMovies(loadedMovies, searchKeywords, isShortMovieChecked);
  
          // Сохранение данных в localStorage
          localStorage.setItem('searchQuery', searchKeywords);
          localStorage.setItem('isShortMovieChecked', isShortMovieChecked);
          localStorage.setItem('searchResults', JSON.stringify(filteredMovies));
          
          setSearchQuery(searchKeywords);
          setIsShortMovieChecked(isShortMovieChecked);
          setSearchResults(filteredMovies);
          console.log(searchResults)
          setIsLoading(false);
          setNoResults(filteredMovies.length === 0);
          console.log(noResults)
            // Обработка загруженных фильмов
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setSearchExecuted(true);
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
        <Route path="/" element={<Main isLoggedIn={isLoggedIn} onOpenMenu={handleMenuOpen}/>}/>
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
              searchQuery={searchQuery}
              searchExecuted={searchExecuted}
              setSearchExecuted={setSearchExecuted}
              setVisibleMovies={setVisibleMovies}
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
              errorMessage={ errorMessage }
              successMessage={ successMessage }
            />} />

          <Route
            path="/signin"
            element={isLoggedIn ? <Navigate to="/" /> : <Login loginUser={loginUser} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>} />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/" /> : <Register registerUser={registerUser} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>} />
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
