import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';

export const getsharedstate = createFeatureSelector<SharedState>('Shared');

export const getloader = createSelector(getsharedstate, (state) => {
  return state.showLoader;
});