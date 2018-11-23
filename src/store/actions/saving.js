import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

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

export const saveStart = () => {
  return {
    type: actionTypes.SAVE_START,
  };
};

export const saveSuccess = (saveData) => {
  return {
    type: actionTypes.SAVE_SUCCESS,
  };
};

export const saveFail = (error) => {
  return {
    type: actionTypes.SAVE_FAIL,
    error: error.message,
  };
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
      });
  };
}

export const save = (title, editorName, controlValues, userId, token) => {
  return dispatch => {
    dispatch(saveStart());
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

export const deleteStart = () => {
  return {
    type: actionTypes.DELETE_START,
  };
};

export const deleteSuccess = () => {
  return {
    type: actionTypes.DELETE_SUCCESS,
  };
};

export const deleteFail = (error) => {
  return {
    type: actionTypes.DELETE_FAIL,
    error: error.message,
  };
};

export const deleteSaving = (id, token) => {
  return dispatch => {
    dispatch(deleteStart());
    const url = `/savings/${id}.json?auth=${token}`;

    axios.delete(url)
      .then(response => {
        console.log(response)
        dispatch(deleteSuccess());
      })
      .catch(error => {
        dispatch(deleteFail(error));
      });
  };
}