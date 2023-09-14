import React, { useEffect } from "react";
import Header from "../Header/Header";
import useForm from "../../utils/hooks/useForm";

export default function Profile({
  isLoggedIn,
  logOut,
  onUpdateUser,
  userData,
  errorMessage,
  successMessage }) {
  const { userName, userEmail } = userData;

  const { form, handleChange, errors, isFormValid } = useForm({
    name: userData.name || "",
    email: userData.email || "",
  });

  useEffect(() => {
    form.name = userData.name;
    form.email = userData.email;
  }, [userData]);

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
        <h1 className="profile__title">Привет, {userData.name}!</h1>
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