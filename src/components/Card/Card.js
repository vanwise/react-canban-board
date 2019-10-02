import React from 'react';
import PropTypes from 'prop-types';
import './card.scss';

function Card ({
    commentsLength=0,
    onClick,
    title
  }) {

  return (
    <li 
      className="card"
      onClick={onClick}
    >
      <h3 className="card__title">
        {title}
      </h3>
      <span className="card__comments-count">
        {commentsLength}
      </span>
    </li>
  )
}

Card.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  commentsLength: PropTypes.number
}

export default Card;