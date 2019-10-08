import { SET_USER_NAME } from './types';

const initialState = {
  name: localStorage.getItem('userName')
};

function user (state=initialState, { type, payload }) {
  switch (type) {
    case SET_USER_NAME: {
      localStorage.setItem('userName', payload.name);
      
      return {
        ...state,
        name: payload.name
      };
    }
    default:
      return state;
  }
}

export default user;