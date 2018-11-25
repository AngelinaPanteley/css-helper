import * as actionTypes from './actionTypes';

export const openHint = (text, isError = false) => {
  return {
    type: actionTypes.OPEN_HINT,
    text,
    isError,
  };
};

export const closeHint = () => {
  return {
    type: actionTypes.CLOSE_HINT,
  };
};