import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return(
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button className="not-found__link" onClick={goBack}>Назад</button>
       {/* <Link to="/" className="not-found__link">Назад</Link> */}
    </section>
  )
}