import promoPic from '../../images/promoPic.svg';

export default function Promo() {
  return(
    <section className="promo">
      <div className="promo__container">
        <a className='promo__link' href="#about">Узнать большe</a>
        <div className="promo__info">
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <img src={promoPic} alt="промо" className="promo__picture" />
      </div>
    </section>
  )
}