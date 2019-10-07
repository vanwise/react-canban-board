import { combineReducers } from 'redux';
import columns from './columns';
import user from './user';
import cards from './cards';
import comments from './comments';

const rootReducer = combineReducers({
  user,
  columns,
  cards,
  comments
});

export default rootReducer;