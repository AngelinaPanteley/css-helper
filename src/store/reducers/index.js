import { combineReducers } from 'redux';
import auth from './auth';
import editors from './editor';

const reducer = combineReducers({
  auth,
  editors,
});

export default reducer;