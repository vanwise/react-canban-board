import React from 'react';
import './modal.scss';
import PropTypes from 'prop-types';

function Modal ({
  isOpen,
  children,
  onOverlayClick=()=>{}
}) {
  if(!isOpen) {
    return null;
  }

  return (
    <div 
      className="modal"
      onClick={onOverlayClick}
    >
      <div
        className="modal__inner"
        onClick={e => e.stopPropagation()}
        onKeyDown={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onOverlayClick: PropTypes.func
}

export default Modal;