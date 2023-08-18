import logo from "../../images/logo.svg";
import iconProfile from "../../images/icon-profile.svg"
import { Link } from "react-router-dom";

export default function Header(props) {
  return(
    <header className={`header ${props.isLoggedIn === false ? 'header_unauthorized' : ''}`}>
      {props.isLoggedIn ? (
        <nav className="header__content">
          <Link to="/">
            <img className="header__logo" src={logo} alt="логотип" />
          </Link>
          <Link to="/movies" className="header__films">Фильмы</Link>
          <Link to="/saved-movies" className="header__saved">Сохраненные фильмы</Link>
          <Link to="/profile" className="header__profile">
            <p>Аккаунт</p>
            <img className="header__icon" src={iconProfile} alt="icon"/>
          </Link>
          <button className="header__menu" type="button" onClick={props.onOpenMenu}/>
        </nav>
        ) : (
          <nav className="header__content">
            <Link to="/">
              <img className="header__logo" src={logo} alt="логотип" />
            </Link>
            <div className="header__auth">
              <Link to="/signup" className="header__register-link">
                Регистрация
              </Link>
              <Link to="/signin" >
              <button className = "header__login-button">Войти</button>
              </Link>
            </div>
          </nav>
          )}
    </header>
  );
}