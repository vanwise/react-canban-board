import {
  ADD_NEW_COMMENT,
  CHANGE_COMMENT,
  REMOVE_COMMENT
} from './types';

export const addNewComment = (cardId, author, value) => ({
  type: ADD_NEW_COMMENT,
  payload: {
    cardId,
    author,
    value
  }
});

export const changeComment = (id, value) => ({
  type: CHANGE_COMMENT,
  payload: {
    id,
    value
  }
});

export const removeComment = id => ({
  type: REMOVE_COMMENT,
  payload: {
    id
  }
});