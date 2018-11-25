import { combineReducers } from 'redux';
import auth from './auth';
import editors from './editor';
import saving from './saving';
import hint from './hint';

const reducer = combineReducers({
  auth,
  editors,
  saving,
  hint,
});

export default reducer;