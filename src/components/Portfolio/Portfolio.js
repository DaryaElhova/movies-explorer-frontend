import arrow from '../../images/arrow.svg';

export default function Portfolio() {
  return(
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a className="portfolio__link" href='https://github.com/DaryaElhova/how-to-learn'>Статичный сайт</a>
          <img className="portfolio__arrow" src={arrow} alt=''/>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href='https://daryaelhova.github.io/russian-travel/'>Адаптивный сайт</a>
          <img className="portfolio__arrow" src={arrow} alt=''/>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href='https://github.com/DaryaElhova/react-mesto-api-full-gha'>Одностраничное приложение</a>
          <img className="portfolio__arrow" src={arrow} alt=''/>
        </li>
      </ul>
    </section>
  )
}