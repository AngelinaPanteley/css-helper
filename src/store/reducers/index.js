import { combineReducers } from 'redux';
import auth from './auth';
import editors from './editor';
import saving from './saving';

const reducer = combineReducers({
  auth,
  editors,
  saving,
});

export default reducer;