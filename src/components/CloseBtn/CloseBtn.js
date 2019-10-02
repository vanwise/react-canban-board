import React from 'react';
import './close-btn.scss';
import PropTypes from 'prop-types';

function CloseBtn ({
  customClass='',
  title='Закрыть',
  onClick
}) {
  return (
    <button 
      className={`close-btn ${customClass}`}
      title={title}
      type="button"
      onClick={onClick}
    />
  )
}

CloseBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  customClass: PropTypes.string,
  title: PropTypes.string
}

export default CloseBtn;