import { createAction, props } from '@ngrx/store';

export const setloader = createAction(
  '[Shared] set loader',
  props<{ status: boolean }>()
);