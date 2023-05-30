import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "src/interfaces/states";

const getAuthState = createFeatureSelector<AuthState>('Auth');

export const getUserId = createSelector(getAuthState, (state) => {
    return state.userId;
})

export const isAuthenticated = createSelector(getAuthState, (state) => {
    return state.userId ? true : false;
})