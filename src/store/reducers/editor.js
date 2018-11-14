import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  names: null,
  settings: null,
  error: null,
};

const editorsInit = (state, action) => {
  const names = Object.keys(action.editors);
  return updateObject(state, {
    names,
    settings: action.editors,
    error: null,
  });
}

const editorsInitFailed = (state, action) => {
  return updateObject(state, {
    error: action.error,
    names: null,
    settings: null,
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EDITORS_INIT: return editorsInit(state, action);
    case actionTypes.EDITORS_INIT_FAILED: return editorsInitFailed(state, action);
    default: return state;
  }
}

export default reducer;