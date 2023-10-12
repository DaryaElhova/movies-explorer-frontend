import React, { useState } from "react";
import Form from "../Form/Form";
import useForm from "../../utils/hooks/useForm";
import { useEffect } from "react";

export default function Login ({ loginUser, errorMessage, setErrorMessage }) {
  const { form, handleChange, errors, isFormValid } = useForm({
    email: "",
    password: "",
  })

  useEffect(()=> {
    setErrorMessage("");
  }, [])


  const handleSubmit = (evt) => {
    evt.preventDefault();
    loginUser(form);
  }

  return(
    <Form
      name="login"
      title="Рады видеть!"
      button="Войти"
      text="Ещё не зарегистрированы?"
      link="/signup"
      linkTitle = "Регистрация"
      onSubmit= {handleSubmit}
      isFormValid={ isFormValid}
      errorMessage={errorMessage}
    >
      <label className="form__label">E-mail</label>
          <input className="form__input"
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                minLength="3"
                required
                value={ form.email || ""}
                onChange={handleChange} />
          <span className="form__input-err">{errors.email}</span>

        <label className="form__label">Пароль</label>
          <input className="form__input"
                type="password"
                name="password"
                id="password"
                required
                autoComplete="current-password"
                value={form.password || ""}
                minLength={6}
                placeholder="Пароль"
                onChange={handleChange} />
          <span className="form__input-err">{errors.password}</span>
    </Form>
  )
}