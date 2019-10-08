import React from 'react';
import PropTypes from 'prop-types';
import Popup from '../Popup';
import CardDetails from '../CardDetails';

function CardDetailsPopup ({
  visibleCardId=null,
  toggleCardDetailsVisibility
}) {
  return (
    <Popup
      isOpen={!!visibleCardId}
      onOverlayClick={toggleCardDetailsVisibility}
    >
      <CardDetails
        visibleCardId={visibleCardId}
        onCloseBtnClick={toggleCardDetailsVisibility}
      />
    </Popup>
  )
}

CardDetailsPopup.propTypes = {
  toggleCardDetailsVisibility: PropTypes.func.isRequired,
  visibleCardId: PropTypes.number
};

export default CardDetailsPopup;