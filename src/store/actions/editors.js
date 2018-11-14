import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const setEditors = (editors) => {
  return {
    type: actionTypes.EDITORS_INIT,
    editors
  }
}

export const fetchEditorsFailed = (error) => {
  return {
    type: actionTypes.EDITORS_INIT_FAILED,
    error,
  }
}

export const initEditors = () => {
  return dispatch => {
    axios.get('/editors.json')
      .then(response => {
        dispatch(setEditors(response.data));
      })
      .catch(error => {
        dispatch(fetchEditorsFailed(error));
      });
  }
}