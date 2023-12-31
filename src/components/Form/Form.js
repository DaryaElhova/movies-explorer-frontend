import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

export default function Form(props) {
  return(
      <section className="form">
        <Link to="/">
          <img className="header__logo" src={ logo } alt="логотип" />
        </Link>
        <h2 className="form__title">{props.title}</h2>
        <form className="form__auth" name="formAuth" onSubmit={props.onSubmit}>
          {props.children}

          {props.errorMessage && (
        <div className="form__input-err">{props.errorMessage}</div>
          )}
          <button
            type="submit"
            className={`form__button form__button_${props.name} ${props.isFormValid ? '' : 'form__button_disabled'}`}
            disabled={!props.isFormValid}>{props.button}
          </button>
        </form>
        
        <div className="form__navigate">
          <p className="form__text">{props.text}</p>
          <Link to={`${props.link}`} className="form__link">{props.linkTitle} </Link>
        </div>
      </section>
  )
}