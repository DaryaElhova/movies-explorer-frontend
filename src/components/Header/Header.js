import logo from "../../images/logo.svg";
import iconProfile from "../../images/icon-profile.svg"
import {  NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Header(props) {
  const location = useLocation();
  const headerClassName = `header ${props.isLoggedIn === false ? 'header_unauthorized' : ''} ${props.isLoggedIn && location.pathname === '/' ? 'header_blue' : '' }`;

return (
  <header className={headerClassName}>
    {props.isLoggedIn ? (
      <nav className="header__content">
        <NavLink to="/">
          <img className="header__logo" src={logo} alt="логотип" />
        </NavLink>
        <NavLink to="/movies" className={`header__films ${({ isActive }) =>(isActive ? "header__link_active" : "")}`}>Фильмы</NavLink>
        <NavLink to="/saved-movies" className={`header__saved ${({ isActive }) =>(isActive ? "header__link_active" : "")}`}>Сохраненные фильмы</NavLink>
        <NavLink to="/profile"  className={`header__profile ${({ isActive }) =>(isActive ? "header__link_active" : "")}`}>
          <p>Аккаунт</p>
          <img className="header__icon" src={iconProfile} alt="icon" />
        </NavLink>
        <button className="header__menu" type="button" onClick={props.onOpenMenu} />
      </nav>
    ) : (
      <nav className="header__content">
        <NavLink to="/">
          <img className="header__logo" src={logo} alt="логотип" />
        </NavLink>
        <div className="header__auth">
          <NavLink to="/signup" className={`header__register-link ${({ isActive }) =>(isActive ? "header__link_active" : "")}`}>
            Регистрация
          </NavLink>
          <NavLink to="/signin">
            <button className="header__login-button">Войти</button>
          </NavLink>
        </div>
      </nav>
    )}
  </header>
);
}