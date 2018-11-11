import { combineReducers } from 'redux';
import authReducer from './authReducer';
import editorReducer from './editorReducer';

const reducer = combineReducers({
  auth: authReducer,
  editors: editorReducer,
});

export default reducer;