import React from 'react';
import './edit-text.scss';
import CloseBtn from '../CloseBtn/CloseBtn';

function EditText ({
  customClass='',
  title,
  onAddBtnClick,
  onCloseBtnClick,
  isDisabled=false
}) {
  return (
    <div 
      className={`edit-text ${customClass}`}
    >
      <button
        className="edit-text__add-btn"
        onClick={() => onAddBtnClick()}
        disabled={isDisabled}
      >
        {title}
      </button>
      <CloseBtn
        onCloseBtnClick={() => onCloseBtnClick()}
        title="Закрыть"
      />
    </div>
  )
}

export default EditText;