import icon from '../../images/search-icon.svg';

export default function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <div className="search__container">
          <img className="search__icon" src={icon} alt="search"/>
          <input className="search__input" placeholder="Фильм"></input>
          <button className="search__button" title="найти"></button>
        </div>
        <label className="search__label">
          Короткометражки
          <input className="search__checkbox" type="checkbox" />
          <span className="search__checkbox-custom"></span>
        </label>
      </form>
    </section>
  )
}