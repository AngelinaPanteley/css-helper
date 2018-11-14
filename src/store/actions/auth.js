import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: authData.idToken,
    userId: authData.localId,
    expiresIn: authData.expiresIn,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.message,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimaout = (expiresIn) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expiresIn * 1000)
  };
};

export const auth = (email, password, isAuth) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB7Rplp6IzECfIbfeSnwLl8xLfuZqH5XNg';
    if (isAuth) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB7Rplp6IzECfIbfeSnwLl8xLfuZqH5XNg';
    }
    axios.post(url, authData)
      .then(response => {
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimaout(response.data.expiresIn))
      })
      .catch(error => {
        dispatch(authFail(error));
      });
  };
};

