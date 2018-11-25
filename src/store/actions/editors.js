import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { openHint } from './hint';

export const setEditors = (editors) => {
  return {
    type: actionTypes.EDITORS_INIT,
    editors
  }
}

export const initEditorsFailed = (error) => {
  return dispatch => dispatch(openHint(error.message, true));
}

export const initEditors = () => {
  return dispatch => {
    axios.get('/editors.json')
      .then(response => {
        dispatch(setEditors(response.data));
      })
      .catch(error => {
        dispatch(initEditorsFailed(error));
      });
  }
}

export const turnEditingModeOn = (id, title) => {
  return {
    type: actionTypes.TURN_EDITING_MODE_ON,
    editingItemId: id,
    editingItemTitle: title,
  }
}

export const turnEditingModeOff = () => {
  return {
    type: actionTypes.TURN_EDITING_MODE_OFF,
    editingItemId: null,
    editingItemTitle: null,
  }
}