import React, { useEffect, useContext } from "react";
import Header from "../Header/Header";
import useForm from "../../utils/hooks/useForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({
  isLoggedIn,
  logOut,
  onUpdateUser,
  errorMessage,
  successMessage }) {
  const currentUser = useContext(CurrentUserContext);

  //Отслеживаю изменение данных в форме


  const { form, handleChange, errors, isFormValid } = useForm({
    name: currentUser.name || "",
    email: currentUser.email || "",
  });

  useEffect(() => {
    form.name = currentUser.name;
    form.email = currentUser.email;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: form.name,
      email: form.email,
    });
  };


  return (
    <section className="profile">
    <Header isLoggedIn={ isLoggedIn} />
    <div className="profile__container">
      <form
        name="profile__form"
        className="profile__form"
        onSubmit={ handleSubmit } >
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <div className="profile__field">
          <label className="profile__label">Имя</label>
          <input
              name="name"
              value={form.name}
              className="profile__input"
              type="text"
              placeholder="Имя"
              minLength={2}
              maxLength={30}
              onChange={ handleChange }
              required>
            </input>
        </div>
        <span className="profile__input-err">{errors.name}</span>

        <div className="profile__input-divider"></div>
        <div className="profile__field">
          <label className="profile__label">E&#8209;mail</label>
          <input
              name="email"
              value={ form.email }
              className="profile__input"
              type="email"
              placeholder="Email"
              minLength={2}
              onChange={ handleChange }
              required>
            </input>
        </div>
        <span className="profile__input-err">{errors.email}</span>
        <div className="profile__btns">

        <div className="profile__input-err">{errorMessage || successMessage}</div>
          <button
            className={`profile__btn profile__btn-edit ${isFormValid ? '' : 'profile__btn-edit_disabled'}`}
            type="submit"
            disabled={!isFormValid}
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