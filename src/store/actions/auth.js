import * as actionTypes from './actionTypes';
import axios from 'axios';
import { openHint } from './hint';

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

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expiresIn) => {
  return dispatch => {
    setTimeout(() => {
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
        dispatch(checkAuthTimeout(response.data.expiresIn));
        dispatch(openHint('Successfully signed in.'));
      })
      .catch(error => {
        dispatch(authFail(error));

        let message = '';

        if (error.message === 'Request failed with status code 400') {
          if (!isAuth) {
            message = 'Incorrect email/password.';
          } else {
            message = 'Such account already exists.';
          }
        } else {
          message = error.message;
        }

        dispatch(openHint(message, true));
      });
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
        dispatch(logout());
      }
    } else {
      dispatch(logout());
    }
  };
};