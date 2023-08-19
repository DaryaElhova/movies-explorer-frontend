import React from "react";
import Form from "../Form/Form";

export default function Login () {
  return(
    <Form
      name="login"
      title="Рады видеть!"
      button="Войти"
      text="Ещё не зарегистрированы?"
      link="/signup"
      linkTitle = "Регистрация"
    >
      <label className="form__label">E-mail</label>
          <input className="form__input"
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                minLength="2"
                maxLength="30" />
          <span className="form__input-err"></span>

        <label className="form__label">Пароль</label>
          <input className="form__input"
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"/>
          <span className="form__input-err"></span>
    </Form>
  )
}