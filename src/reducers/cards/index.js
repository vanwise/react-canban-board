import {
  ADD_NEW_CARD,
  CHANGE_CARD_PROP,
  REMOVE_CARD
} from './actionsTypes';
import getRandomId from '../../utils/getRandomId';
import initData from '../../utils/initData';

const initialState = initData('cards');

function cards (state=initialState, { type, payload }) {
  switch (type) {
    case ADD_NEW_CARD: {
      const stateCopy = [...state];
      const newCard = {
        id: getRandomId(),
        columnId: payload.columnId,
        author: payload.author,
        title: payload.value,
        desc: ''
      };

      stateCopy.push(newCard);
      localStorage.setItem('cards', JSON.stringify(stateCopy));
      
      return [...stateCopy];
    }
    case CHANGE_CARD_PROP: {
      const stateCopy = [...state];
      const currentCardIndex = stateCopy.findIndex(item => item.id === payload.id);

      stateCopy[currentCardIndex][payload.propName] = payload.value;
      localStorage.setItem('cards', JSON.stringify(stateCopy));

      return [...stateCopy];
    }
    case REMOVE_CARD: {
      const stateCopy = [...state];
      const currentCardIndex = stateCopy.findIndex(item => item.id === payload.id);

      stateCopy.splice(currentCardIndex, 1);
      localStorage.setItem('cards', JSON.stringify(stateCopy));

      return [...stateCopy];
    }
    default:
      return state;
  }
}

export default cards;