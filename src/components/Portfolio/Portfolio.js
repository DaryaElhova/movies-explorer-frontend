import arrow from '../../images/arrow.svg';

export default function Portfolio() {
  return(
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href='https://github.com/DaryaElhova/how-to-learn'
            target="_blank"
            rel="noopener noreferrer">Статичный сайт
            <img className="portfolio__arrow" src={arrow} alt='стрелка'/>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href='https://daryaelhova.github.io/russian-travel/'
            target="_blank"
            rel="noopener noreferrer">Адаптивный сайт
            <img className="portfolio__arrow" src={arrow} alt='стрелка'/>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href='https://github.com/DaryaElhova/react-mesto-api-full-gha'
            target="_blank"
            rel="noopener noreferrer">Одностраничное приложение
            <img className="portfolio__arrow" src={arrow} alt='стрелка'/>
          </a>
        </li>
      </ul>
    </section>
  )
}