import React from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext'

export default function Card({ card, onClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwner = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like-button ${isLiked ? 'card__like-button_active' : 'card__like-button_disabled'}`
  );

  function handleClick() {
    onClick(card)
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <div className="card__image-container">
        <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
      </div>
      { isOwner ? <button className='card__delete-button' onClick={handleCardDelete}></button> : null}
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button className={cardLikeButtonClassName} type="button" onClick={handleCardLike} ></button>
          <p className="card__likes-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}