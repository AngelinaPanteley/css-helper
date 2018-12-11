import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { openHint } from './hint';

export const getSavingsStart = () => {
  return {
    type: actionTypes.GET_SAVINGS_START,
  };
};

export const getSavingsSuccess = (saveData) => {
  return {
    type: actionTypes.GET_SAVINGS_SUCCESS,
    savings: saveData,
  };
};

export const getSavingsFail = (error) => {
  return {
    type: actionTypes.GET_SAVINGS_FAIL,
    error: error.message,
  };
};

export const saveSuccess = (saveData) => {
  return dispatch => dispatch(openHint('Successfully saved.'));
};

export const saveFail = (error) => {
  return dispatch => dispatch(openHint(error.message, true));
};

export const deleteSuccess = () => {
  return dispatch => dispatch(openHint('Successfully deleted.'));
};

export const deleteFail = (error) => {
  return dispatch => dispatch(openHint(error.message, true));
};

export const getSavings = (userId, token) => {
  return dispatch => {
    dispatch(getSavingsStart());

    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    const url = '/savings.json';

    axios.get(url + queryParams)
      .then(response => {
        dispatch(getSavingsSuccess(response.data));
      })
      .catch(error => {
        dispatch(getSavingsFail(error));
        dispatch(openHint(error.message, true));
      });
  };
}

export const save = (title, editorName, controlValues, userId, token) => {
  return dispatch => {
    const saveData = {
      title,
      editorName,
      controlValues,
      userId,
      data: new Date().getTime(),
    };

    const queryParams = '?auth=' + token;
    const url = '/savings.json';

    axios.post(url + queryParams, saveData)
      .then(response => {
        dispatch(saveSuccess(response.data));
      })
      .catch(error => {
        dispatch(saveFail(error));
      });
  };
};

export const saveEditedItem = (id, title, editorName, controlValues, userId, token) => {
  return dispatch => {
    const saveData = {
      title,
      editorName,
      controlValues,
      userId,
      data: new Date().getTime(),
    };

    const queryParams = '?auth=' + token;
    const url = `/savings/${id}.json`;

    axios.put(url + queryParams, saveData)
      .then(response => {
        dispatch(saveSuccess(response.data));
      })
      .catch(error => {
        dispatch(saveFail(error));
      });
  };
};

export const deleteSaving = (id, token) => {
  return dispatch => {
    const url = `/savings/${id}.json?auth=${token}`;

    axios.delete(url)
      .then(response => {
        dispatch(deleteSuccess());
      })
      .catch(error => {
        dispatch(deleteFail(error));
      });
  };
}