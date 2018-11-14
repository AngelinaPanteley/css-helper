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
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.message,
  };
};

export const authInit = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate.getTime() > new Date().getTime()) {
        dispatch(authSuccess({
          idToken: token,
          localId: localStorage.getItem('userId'),
        }));
        dispatch(checkAuthTimeout(expirationDate.getTime() / 1000 - new Date().getTime() / 1000));
      } else {
        console.log('logout1');
        dispatch(logout());
      }
    } else {
      console.log('logout2');
      dispatch(logout());
    }
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expiresIn) => {
  console.log(Math.round(expiresIn));
  return dispatch => {
    setTimeout(() => {
      console.log('logout3');
      dispatch(logout());
    }, Math.round(expiresIn) * 1000);
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
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userId', response.data.localId);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(error => {
        dispatch(authFail(error));
      });
  };
};

