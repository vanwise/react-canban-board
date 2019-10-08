import { SET_USER_NAME } from './types';

export const setUserName = value => ({
  type: SET_USER_NAME,
  payload: {
    name: value
  }
});