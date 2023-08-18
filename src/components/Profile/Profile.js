import React from "react";
import Header from "../Header/Header";


export default function Profile(isLoggedIn) {
  return (
    <>
    <Header isLoggedIn={ isLoggedIn} />
    <div className="profile">
      <form name="profile__form" className="profile__form">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <div className="profile__field">
          <label className="profile__label">Имя</label>
          <input
              name="name"
              value="Виталий"
              className="profile__input"
              type="text"
              placeholder="Имя"
              minLength={2}
              maxLength={30}
              required>
            </input>
        </div>
        <div className="profile__input-divider"></div>
        <div className="profile__field">
          <label className="profile__label">E&#8209;mail</label>
          <input
              name="email"
              value="pochta@yandex.ru"
              className="profile__input"
              type="email"
              placeholder="Email"
              minLength={2}
              required>
            </input>
        </div>
      <div className="profile__btns">
        <button className="profile__btn profile__btn-edit">Редактировать</button>
        <button className="profile__btn profile__btn-logout">Выйти из аккаунта</button>
      </div>
      </form>
    </div>
    </>
  )
}