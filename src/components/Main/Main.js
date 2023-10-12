import React from 'react';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe'
import Portfolio from '../Portfolio/Portfolio';

export default function Main({isLoggedIn, onOpenMenu}) {
  return(
    <>
    <Header isLoggedIn={isLoggedIn} onOpenMenu={onOpenMenu}/>
    <main>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
    </>
  )
}