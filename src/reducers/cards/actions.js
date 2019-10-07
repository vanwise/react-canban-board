import {
  ADD_NEW_CARD,
  CHANGE_CARD_PROP,
  REMOVE_CARD
} from './actionsTypes';

export const addNewCard = (columnId, author, value) => ({
  type: ADD_NEW_CARD,
  payload: {
    columnId,
    author,
    value
  }
});

export const changeCardProp = (id, propName, value) => ({
  type: CHANGE_CARD_PROP,
  payload: {
    id,
    propName,
    value
  }
});

export const removeCard = id => ({
  type: REMOVE_CARD,
  payload: {
    id
  }
});