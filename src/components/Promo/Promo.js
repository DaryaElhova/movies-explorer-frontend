import promoPic from '../../images/promoPic.svg';

export default function Promo() {
  return(
    <div className="promo">
      <div className="promo__container">
        <button className='promo__button'>Узнать больше</button>
        <div className="promo__info">
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <img src={promoPic} alt="" className="promo__picture" />
      </div>
    </div>
  )
}