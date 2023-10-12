export default function FilterCheckbox({ 
  isShortMovieChecked,
  onCheckboxChange }) {

  return (
    <section className="checkbox">
      <label className="checkbox__label">
        Короткометражки
        <input
          className="checkbox___input"
          type="checkbox"
          name="shortFilmCheckbox"
          checked={isShortMovieChecked}
          onChange={onCheckboxChange}
            />
        <span className="checkbox__input-custom"></span>
      </label>
    </section>
  )
}