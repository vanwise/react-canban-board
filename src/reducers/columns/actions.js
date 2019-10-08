import { CHANGE_COLUMN_TITLE } from './types';

export const changeColumnTitle = (id, value) => ({
  type: CHANGE_COLUMN_TITLE,
  payload: {
    id,
    value
  }
});