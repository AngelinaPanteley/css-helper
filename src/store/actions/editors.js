import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const setEditors = (editors) => {
  return {
    type: actionTypes.SET_EDITORS,
    editors
  }
}

export const fetchEditorsFailed = () => {
  return {
    type: actionTypes.SET_EDITORS_FAILED
  }
}

export const initEditors = () => {
  return dispatch => {
    axios.get('/editors.json')
      .then(response => {
        dispatch(setEditors(response.data));
      })
      .catch(error => {
        dispatch(fetchEditorsFailed());
      });
  }
}