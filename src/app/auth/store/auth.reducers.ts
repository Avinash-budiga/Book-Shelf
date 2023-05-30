import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import { logIn, loginFailure, loginSucces, logoutSuccess, signUp, signupFailure, signupSuccess } from './auth.actions';

export const _authReducer = createReducer(
  initialState,
  on(signUp, (state) => {
    return {
      ...state,
    };
  }),
  on(signupSuccess, (state) => {
    return {
      ...state,
    };
  }),
  on(signupFailure, (state) => {
    return {
      ...state,
    };
  }),
  on(logIn, (state) => {
    return {
      ...state,
    }
  }),
  on(loginSucces, (state, action) => {
    return {
      ...state,
      userId:action.userId,
      error: null,
    }
  }),
  on(loginFailure, (state, action) => {
    return {
      ...state,
      userId: null,
      error: action.error,
    }
  }),
  on(logoutSuccess, (state, action) => {
    return {
      ...state,
      userId: null,
      error: null,
    }
  }),
);

export function AuthReducer(state, action) {
  return _authReducer(state, action);
}
