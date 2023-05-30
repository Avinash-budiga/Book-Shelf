import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookshelfState } from '../../../interfaces/states';

export const getsharedstate = createFeatureSelector<BookshelfState>('bookShelf');

export const getWantToReadBooks = createSelector(getsharedstate, (state) => {
    return state.wantToReadBooks;
});

export const getCurrentlyReadingBooks = createSelector(getsharedstate, (state) => {
    return state.currentlyReadingBooks;
});

export const getReadDoneBooks = createSelector(getsharedstate, (state) => {
    return state.readDoneBooks;
});