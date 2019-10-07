import {
  ADD_NEW_COMMENT,
  CHANGE_COMMENT,
  REMOVE_COMMENT
} from './actionsTypes';
import getRandomId from '../../utils/getRandomId';
import initData from '../../utils/initData';

const initialState = initData('comments');

function comments (state=initialState, { type, payload }) {
  switch (type) {
    case ADD_NEW_COMMENT: {
      const stateCopy = [...state];
      const newComment = {
        id: getRandomId(),
        cardId: payload.cardId,
        author: payload.author,
        text: payload.value
      };

      stateCopy.push(newComment);
      localStorage.setItem('comments', JSON.stringify(stateCopy));

      return [...stateCopy];
    }
    case CHANGE_COMMENT: {
      const stateCopy = [...state];
      const currentCommentIndex = stateCopy.findIndex(item => item.id === payload.id);

      stateCopy[currentCommentIndex].text = payload.value;
      localStorage.setItem('comments', JSON.stringify(stateCopy));

      return [...stateCopy];
    }
    case REMOVE_COMMENT: {
      const stateCopy = [...state];
      const currentCommentIndex = stateCopy.findIndex(item => item.id === payload.id);

      stateCopy.splice(currentCommentIndex, 1);
      localStorage.setItem('comments', JSON.stringify(stateCopy));

      return [...stateCopy];
    }
    default:
      return state;
  }
}

export default comments;