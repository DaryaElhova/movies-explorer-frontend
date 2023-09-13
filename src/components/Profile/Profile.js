import React, { useEffect, useState, useContext } from "react";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


export default function Profile({ isLoggedIn, logOut, onUpdateUser, userData }) {
  const { userName, userEmail} = userData;
  const [name, setName] = useState(userData.name || "");
  const [email, setEmail] = useState(userData.email || "");
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);

  
  console.log(userData);

  function handleNameChange(e){
    setName(e.target.value);
  }

  function handlleEmailChange(e){
    setEmail(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();

    onUpdateUser({
      name,
      email,
    })
  }

  useEffect(() => {
      setName(userName );
      setEmail(userEmail);
  }, [])

  return (
    <section className="profile">
    <Header isLoggedIn={ isLoggedIn} />
    <div className="profile__container">
      <form
        name="profile__form"
        className="profile__form"
        onSubmit={ handleSubmit } >
        <h1 className="profile__title">Привет, {userData.name}!</h1>
        <div className="profile__field">
          <label className="profile__label">Имя</label>
          <input
              name="name"
              value={name}
              className="profile__input"
              type="text"
              placeholder="Имя"
              minLength={2}
              maxLength={30}
              onChange={ handleNameChange }
              required>
            </input>
        </div>
        <div className="profile__input-divider"></div>
        <div className="profile__field">
          <label className="profile__label">E&#8209;mail</label>
          <input
              name="email"
              value={ email }
              className="profile__input"
              type="email"
              placeholder="Email"
              minLength={2}
              onChange={ handlleEmailChange }
              required>
            </input>
        </div>
        <div className="profile__btns">
          <button
            className="profile__btn profile__btn-edit"
            type="submit"
            >Редактировать</button>
          <button
            type="button"
            onClick={logOut}
            className="profile__btn profile__btn-logout"
            >Выйти из аккаунта</button>
        </div>
      </form>
    </div>
    </section>
  )
}