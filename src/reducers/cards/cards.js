import {
  ADD_NEW_CARD,
  CHANGE_CARD_PROP,
  REMOVE_CARD
} from './types';
import getRandomId from '../../utils/getRandomId';
import initData from '../../utils/initData';

const initialState = initData('cards');

function cards (state=initialState, { type, payload }) {
  switch (type) {
    case ADD_NEW_CARD: {
      const stateCopy = {...state};
      const newCard = {
        id: getRandomId(),
        columnId: payload.columnId,
        author: payload.author,
        title: payload.value,
        desc: ''
      };

      stateCopy[newCard.id] = newCard;
      localStorage.setItem('cards', JSON.stringify(stateCopy));
      
      return stateCopy;
    }
    case CHANGE_CARD_PROP: {
      const stateCopy = {...state};

      stateCopy[payload.id][payload.propName] = payload.value;
      localStorage.setItem('cards', JSON.stringify(stateCopy));

      return stateCopy;
    }
    case REMOVE_CARD: {
      const stateCopy = {...state};

      delete stateCopy[payload.id];
      localStorage.setItem('cards', JSON.stringify(stateCopy));

      return stateCopy;
    }
    default:
      return state;
  }
}

export default cards;