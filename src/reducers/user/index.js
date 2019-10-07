import { SET_USER_NAME } from './actionsTypes';

const initialState = {
  name: localStorage.getItem('userName')
};

function user (state=initialState, { type, payload }) {
  switch (type) {
    case SET_USER_NAME: {
      localStorage.setItem('userName', payload);
      
      return {
        ...state,
        name: payload
      };
    }
    default:
      return state;
  }
}

export default user;