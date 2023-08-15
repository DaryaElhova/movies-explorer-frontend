export default function AboutMe() {
  return(
    <section className="about-me">
      <h2 className="section__title">Студент</h2>
      <div className="about-me__content">
        <div className="about-me__info">
          <h3 className="about-me__name">Дарья</h3>
          <p className="about-me__profession">Фронтенд-разработчик</p>
          <p className="about-me__story">Окончила НИУ Высшая Школа Экономики в 2013г, факультет экономики. Имела опыт работа аналитиком. Последние 6 лет занимаюсь своим бизнесом.</p>
          <a className="about-me__link" href='https://github.com/DaryaElhova'>Github</a>
        </div>
        <div className="about-me__photo"></div>
      </div>
    </section>
  )
}