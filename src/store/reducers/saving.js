import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  savings: null,
  error: null,
  loading: true,
};

const getSavingsStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
}

const getSavingsSuccess = (state, action) => {
  return updateObject(state, {
    savings: action.savings,
    error: null,
    loading: false,
  });
}

const getSavingsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SAVINGS_START: return getSavingsStart(state, action);
    case actionTypes.GET_SAVINGS_SUCCESS: return getSavingsSuccess(state, action);
    case actionTypes.GET_SAVINGS_FAIL: return getSavingsFail(state, action);
    default: return state;
  }
};

export default reducer;