import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { BookService } from 'src/services/book.service';
import {
  addToShelf,
  addToShelfSuccess,
  deleteBook,
  loadBooks,
  loadBooksFailure,
  loadBooksSuccess,
  moveBook,
  moveBookFailure,
  moveBookSuccess,
} from './shelf.actions';
import { Book } from 'src/interfaces/book';
import { ReturnStatement } from '@angular/compiler';
import { Router, createUrlTreeFromSnapshot } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class ShelfEffects {
  constructor(private actions$: Actions, private bookService: BookService, private router:Router) {}

  //Add to shelf effect:
  addToShelf$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToShelf),
      mergeMap((action) =>
        this.bookService.searchBooks(action.bookid).pipe(
          map((res) => {
            const filterBooks = res?.['items'] || [];
            const book = filterBooks.find((item) => item.id === action.bookid);
            const searchedBooks = book ? [book] : filterBooks;
            return {
              title: searchedBooks[0]?.volumeInfo?.title,
              author: searchedBooks[0]?.volumeInfo?.authors,
              id: searchedBooks[0]?.id,
              url: searchedBooks[0]?.volumeInfo?.imageLinks?.thumbnail,
            };
          }),
          mergeMap((book) => {
            console.log(book);
            this.bookService.addBook(action.srcShelf, book);
            return of(addToShelfSuccess());
          })
        )
      )
    )
  );

  //load books in shelf:
  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBooks),
      mergeMap((action) =>
        this.bookService.getBookslist(action.shelf).pipe(
          map((res) => {
            return res;
          }),
          map((books) => loadBooksSuccess({ shelf: action.shelf, books })),
          catchError((error) => of(loadBooksFailure({ error: error.message })))
        )
      )
    );
  });

  //traverse books :
  traverseBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(moveBook),
      mergeMap((action) => {
        return this.bookService.getBook(action.srcShelf, action.bookId).pipe(
          map((book) => {
            if (book) {
              this.bookService.moveBook(action.destShelf, book);
              this.bookService.deleteBook(action.srcShelf, action.bookId);
              return moveBookSuccess({
                srcShelf: action.srcShelf,
                destShelf: action.destShelf,
                book: book,
              });
            } else {
              return moveBookFailure({ error: 'book not found' });
            }
          }),
          catchError((error) => of(moveBookFailure(error)))
        );
      })
    );
  });

  bookSearchredirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(moveBookSuccess),
        tap(() => {
          this.router.navigate(['/bookshelf']);
        })
      ),
    { dispatch: false }
  );
}
