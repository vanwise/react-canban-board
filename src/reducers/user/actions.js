import { SET_USER_NAME } from './actionsTypes';

export const setUserName = value => ({
  type: SET_USER_NAME,
  payload: value
});