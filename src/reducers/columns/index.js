import { CHANGE_COLUMN_TITLE } from './actionTypes';
import initData from '../../utils/initData';

const initialState = initData('columns');

function columns (state=initialState, { type, payload }) {
  switch (type) {
    case CHANGE_COLUMN_TITLE: {
      const stateCopy = [...state];
      const currentColumnIndex = stateCopy.findIndex(item => item.id === payload.id);

      stateCopy[currentColumnIndex].title = payload.value;
      localStorage.setItem('columns', JSON.stringify(stateCopy));

      return [...stateCopy];
    }
    default:
      return state;
  }
}

export default columns;