import { createReducer, on } from '@ngrx/store';
import { initialState } from '../store/shared.state';
import { setloader } from './shared.actions';

const _sharedReducer = createReducer(
  initialState,
  on(setloader, (state, action) => {
    return {
      ...state,
      showLoader: action.status,
    };
  }),
);

export function sharedReducer(state, action) {
  return _sharedReducer(state, action);
}
