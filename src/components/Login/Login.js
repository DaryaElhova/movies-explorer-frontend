import React from "react";
import Form from "../Form/Form";
import useForm from "../../utils/hooks/useForm";
import { useNavigate } from "react-router";

export default function Login ({ loginUser }) {
  const { form, handleChange } = useForm({
    email: "",
    password: "",
  })

  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    loginUser(form);
    // navigate("/movies", { replace: true });
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
          <span className="form__input-err"></span>

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
          <span className="form__input-err"></span>
    </Form>
  )
}