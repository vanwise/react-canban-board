import React from 'react';
import './close-btn.scss';

function CloseBtn ({ customClass, title, onCloseBtnClick }) {
  return (
    <button 
      className={`close-btn ${customClass}`}
      title={title}
      onClick={() => onCloseBtnClick()}
    />
  )
}

export default CloseBtn;