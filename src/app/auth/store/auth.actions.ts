import { createAction, props } from '@ngrx/store';
import { createUser, loginUser, userDetails } from 'src/interfaces/users';

//singup actions:
export const signUp = createAction(
  '[Auth] Signup',
  props<{ userdata: createUser }>()
);

export const signupSuccess = createAction('[Auth] Signup Success');

export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: string }>()
);

//login actions:
export const logIn = createAction(
  '[Auth] login',
  props<{ userdata: loginUser }>()
);

export const loginSucces = createAction(
  '[Auth] login success',
  props<{ userId: string }>()
);

export const loginFailure = createAction(
  '[Auth] login fail',
  props<{ error: string }>()
);

//logout actions:
export const logOut = createAction('[Auth] logout');

export const logoutSuccess = createAction('[Auth] logout success');

export const logoutFailure = createAction('[Auth]', props<{ error: string }>());
