import { CHANGE_COLUMN_TITLE } from './actionTypes';

export const changeColumnTitle = (id, value) => ({
  type: CHANGE_COLUMN_TITLE,
  payload: {
    id,
    value
  }
});