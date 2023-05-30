import { createAction, props } from '@ngrx/store';
import { Book } from 'src/interfaces/book';

export const addToShelf = createAction(
  '[Shelf] Add to Shelf',
  props<{ srcShelf: string; bookid: string }>()
);
export const addToShelfSuccess = createAction(
  '[Shelf] Add to Shelf Success',
);
export const addToShelfFailure = createAction(
  '[Shelf] Add to Shelf Failure',
  props<{ error: string }>()
);
export const loadBooks = createAction(
  '[Bookshelf] Load Books',
  props<{ shelf: string}>()
);
export const loadBooksSuccess = createAction(
  '[Bookshelf] Load Books Success',
  props<{ shelf: string; books: Book[] }>()
);
export const loadBooksFailure = createAction(
  '[Bookshelf] Load Books Failure',
  props<{ error: string }>()
);

export const moveBook = createAction(
  '[Bookshelf] Move Book',
  props<{ srcShelf: string; destShelf: string; bookId: string }>()
);
export const moveBookSuccess = createAction(
  '[Bookshelf] Move Book Success',
  props<{ srcShelf: string; destShelf: string; book: Book }>()
);
export const moveBookFailure = createAction(
  '[Bookshelf] Move Book Failure',
  props<{ error: string }>()
);

export const deleteBook = createAction(
  '[Bookshelf] Remove Book',
  props<{ srcShelf: string; bookId: string }>()
);
export const deleteBookSuccess = createAction(
  '[Bookshelf] Remove Book Success',
  props<{ srcShelf: string; bookId: string }>()
);
export const deleteBookFailure = createAction(
  '[Bookshelf] Remove Book Failure',
  props<{ error: string }>()
);
