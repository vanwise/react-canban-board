import React from 'react';
import './popup.scss';
import PropTypes from 'prop-types';

function Popup ({
  isOpen,
  children,
  onOverlayClick=()=>{}
}) {
  if(!isOpen) {
    return null;
  }

  return (
    <div 
      className="popup"
      onClick={() => onOverlayClick()}
    >
      <div
        className="popup__inner"
        onClick={e => e.stopPropagation()}
        onKeyDown={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onOverlayClick: PropTypes.func
}

export default Popup;