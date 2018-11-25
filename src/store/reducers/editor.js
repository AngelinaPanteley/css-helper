import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  names: null,
  settings: null,
  editingItemId: null,
  editingItemTitle: null,
};

const editorsInit = (state, action) => {
  const names = Object.keys(action.editors);
  return updateObject(state, {
    names,
    settings: action.editors,
  });
}

const turnEditingModeOn = (state, action) => {
  return updateObject(state, {
    editingItemId: action.editingItemId,
    editingItemTitle: action.editingItemTitle,
  })
}

const turnEditingModeOff = (state, action) => {
  console.log('OFFF')
  return updateObject(state, {
    editingItemId: null,
    editingItemTitle: null,
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EDITORS_INIT: return editorsInit(state, action);
    case actionTypes.TURN_EDITING_MODE_ON: return turnEditingModeOn(state, action);
    case actionTypes.TURN_EDITING_MODE_OFF: return turnEditingModeOff(state, action);
    default: return state;
  }
}

export default reducer;