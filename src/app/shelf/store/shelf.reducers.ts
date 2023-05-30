import { createReducer, on } from '@ngrx/store';
import {
  addToShelfSuccess,
  addToShelfFailure,
  loadBooks,
  loadBooksSuccess,
  loadBooksFailure,
  moveBookSuccess,
  deleteBookSuccess,
} from './shelf.actions';
import { Book } from 'src/interfaces/book';
import { initialState } from './shelf.state';

export const shelfReducer = createReducer(
  initialState,
  //Add books to shelf actions:
  on(addToShelfSuccess, (state) => {
    return {
      ...state,
    };
  }),
  on(addToShelfFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  //Load books on shelf actions:
  on(loadBooks, (state) => ({
    ...state,
    error: '',
  })),
  on(loadBooksSuccess, (state, action) => {
    switch (action.shelf) {
      case 'want-to-read':
        return { ...state, wantToReadBooks: action.books };
      case 'currently-reading':
        return { ...state, currentlyReadingBooks: action.books };
      case 'read-done':
        return { ...state, readDoneBooks: action.books };
      default:
        return state;
    }
  }),
  on(loadBooksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  //move books actions:
  on(moveBookSuccess, (state, { srcShelf, destShelf, book }) => {
    const srcShelfIsEmpty = state[srcShelf].length === 0;
    const updatedState = {
      ...state,
      [srcShelf]: srcShelfIsEmpty ? [] : state[srcShelf].filter((b) => b.id !== book.id),
      [destShelf]: [...state[destShelf], book],
    };
    return updatedState;
  }),
  //Remove books actions:
  on(deleteBookSuccess, (state, { srcShelf, bookId }) => {
    const updatedState = {
      ...state,
      [srcShelf]: state[srcShelf].filter((b:Book) => b.id !== bookId),
    };
    return updatedState;
  })
);
