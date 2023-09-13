export default function ShowMore({ onShowMoreClick, additionalCardCount }) {
  const handleClickShowMore = () => {
    onShowMoreClick(additionalCardCount);
  }

  return (
    <div className="show-more">
      <button className="show-more__button" type="button" onClick={handleClickShowMore } >Ещё</button>
    </div>
  )
}