import { CHANGE_COLUMN_TITLE } from './types';
import initData from '../../utils/initData';

const initialState = initData('columns');

function columns (state=initialState, { type, payload }) {
  switch (type) {
    case CHANGE_COLUMN_TITLE: {
      const stateCopy = {...state};

      stateCopy[payload.id].title = payload.value;
      localStorage.setItem('columns', JSON.stringify(stateCopy));

      return stateCopy;
    }
    default:
      return state;
  }
}

export default columns;