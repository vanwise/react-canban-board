import React from 'react';
import './card.scss';

function Card ({
    columnId,
    cardId,
    title,
    commentsCount,
    visibleDataByCardId
  }) {
  function onCardClick () {
    visibleDataByCardId(columnId, cardId)
  }

  return (
    <li 
      className="card"
      onClick={() => onCardClick()}
    >
      <h3 className="card__title">
        {title}
      </h3>
      <span className="card__comments-count">
        {commentsCount}
      </span>
    </li>
  )
}

export default Card;