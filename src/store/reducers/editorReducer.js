import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  names: null,
  settings: null,
  error: null,
};

const setEditors = (state, editors) => {
  const names = Object.keys(editors);
  return updateObject(state, {
    names,
    settings: editors,
    error: null,
  });
}

const setEditorsFailed = (state, error) => {
  return updateObject(state, {
    error,
    names: null,
    settings: null,
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_EDITORS: return setEditors(state, action.editors);
    case actionTypes.SET_EDITORS_FAILED: return setEditorsFailed(state, action.error);
    default: return state;
  }
}

export default reducer;