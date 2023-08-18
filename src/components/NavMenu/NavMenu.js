import React from "react";
import image from "../../images/icon-profile.svg";
import { useEffect } from "react";

export default function NavMenu({ isOpen, onClose }) {
  // зактытие меню по esc
  useEffect(() => {
    if (!isOpen) return;

    const closeByEsc = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    };

    document.addEventListener("keydown", closeByEsc);

    return () => document.removeEventListener("keydown", closeByEsc);
  }, [isOpen, onClose]);

  // закрытие по клику на оверлей
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return(
    <div
      className={`nav-menu ${isOpen ? "nav-menu_opened" : ""}`}
      onClick={handleOverlay}>
      <div className="nav-menu__container">
        <button className="nav-menu__close" type="button" onClick={onClose}></button>
        <ul className="nav-menu__list">
          <li className="nav-menu__item">
            <a className="nav-menu__link" href="/">Главная</a>
          </li>
          <li className="nav-menu__item">
            <a className="nav-menu__link" href="/movies">Фильмы</a>
          </li>
          <li className="nav-menu__item">
            <a className="nav-menu__link" href="/saved-movies">Сохранённые фильмы</a>
          </li>
          <li className="nav-menu__item nav-menu__account">
            <a className="nav-menu__link nav-menu__link_small-text" href="/profile">Аккаунт</a>
            <img className="nav-menu__pic" src={image} alt="профиль"/>
          </li>
        </ul>
      </div>
    </div>
  )
}