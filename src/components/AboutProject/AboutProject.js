export default function AboutProject() {
  return(
    <section className="about" id="about">
      <h2 className="section__title">О проекте</h2>
      <div className="about__description">
        <div className="about__project">
          <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="section__info">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about__project">
          <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="section__info">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about__term">
        <p className="about__one-week">1 неделя</p>
        <p className="about__four-week">4 недели</p>
        <p className="about__dev">Back-end</p>
        <p className="about__dev">Front-end</p>
      </div>
    </section>
  )
}