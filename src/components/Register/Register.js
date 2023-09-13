import React from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../utils/hooks/useForm";
import Form from "../Form/Form";

export default function Register({ registerUser }) {
  const { form, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    registerUser(form);
    navigate("/signin", { replace: true });
  }

  return(
    <Form
      name="register"
      title="Добро пожаловать!"
      button="Зарегистрироваться"
      text="Уже зарегистрированы?"
      link="/signin"
      linkTitle = "Войти"
      onSubmit={handleSubmit} >
        <label className="form__label">Имя</label>
          <input className="form__input"
                type="text"
                name="name"
                id="name"
                placeholder="Имя"
                minLength="2"
                maxLength="30"
                required
                value={form.name || ""}
                onChange={handleChange} />
          <span className="form__input-err"></span>

        <label className="form__label">E-mail</label>
          <input className="form__input"
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                minLength="3"
                required
                value={form.email || ""}
                onChange={handleChange} />
          <span className="form__input-err"></span>

        <label className="form__label">Пароль</label>
          <input className="form__input"
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
                required
                autoComplete="current-password"
                value={form.password || ""}
                minLength={6}
                onChange={handleChange}/>
          <span className="form__input-err"></span>
      </Form>
  )
}