import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const hideFooterPaths = ["/signin", "/signup", "/not-found", "/profile"];
  // Проверка, нужно ли скрывать футер для текущего пути
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);
  // Если shouldHideFooter равно true, то не отображаем футер
  if (shouldHideFooter) {
    return null;
  }

  return(
    <footer className="footer">
    <div className="footer__container">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <ul className="footer__items">
        <li className="footer__year">	&#64; 2022</li>
        <li className="footer__links">
          <a className="footer__link" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/">Github</a>
      </li>
      </ul>
    </div>
  </footer>
  )

}