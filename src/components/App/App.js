import React from 'react';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

import NavMenu from '../NavMenu/NavMenu';


import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuOpen() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className="page">
      <Header
        isLoggedIn={ isLoggedIn }
        onOpenMenu={ handleMenuOpen }/>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route 
          path="/movies"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              component={Movies}
               />
          }/>
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute 
            isLoggedIn={isLoggedIn}
            component={SavedMovies}
            />
          }/>
        <Route
          path="/profile"
          element={
            <ProtectedRoute 
            isLoggedIn={isLoggedIn}
            component={Profile} />
          }/>
          <Route
            path="/signin"
            element={<Login />} />
          <Route
            path="/signup"
            element={<Register />} />
          <Route
            path="/not-found"
            element={<NotFound />} />
          {/* <Route
            path="/menu"
            element={<NavMenu />} /> */}
      </Routes>
      <Footer />
      <NavMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </div>
  );
}

export default App;
