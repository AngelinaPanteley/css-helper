import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  editors: null,
  error: null,
  loading: false
};

const setEditors = (state, editors) => {
  return updateObject(state, {
    editors,
    loading: false,
    error: null,
  });
}

const setEditorsFailed = (state, error) => {
  return updateObject(state, {
    error,
    editors: null,
    loading: false,
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