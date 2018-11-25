import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  text: null,
  isError: null,
  isOpen: false,
};

const openHint = (state, action) => {
  return updateObject(state, {
    text: action.text,
    isError: action.isError,
    isOpen: true,
  });
}

const closeHint = (state, action) => {
  return updateObject(state, {
    text: null,
    isOpen: false,
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_HINT: return openHint(state, action);
    case actionTypes.CLOSE_HINT: return closeHint(state, action);
    default: return state;
  }
}

export default reducer;