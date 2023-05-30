import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import {
  AngularFireDatabase,
  SnapshotAction,
} from '@angular/fire/compat/database';
import { Book } from '../interfaces/book';
import { Store } from '@ngrx/store';
import { getUserId } from 'src/app/auth/store/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  bookinput = new BehaviorSubject<Book[]>([]);
  userpath: string;
  baseUrl: string = 'https://www.googleapis.com/books/v1/volumes?q=';

  constructor(
    private http: HttpClient,
    private store: Store,
    private db: AngularFireDatabase
  ) {
    this.store.select(getUserId).subscribe((id) => {
      this.userpath = id;
    });
  }

  search(query: any): Observable<any> {
    return this.http.get(`${this.baseUrl}${query}&maxResults=5`);
  }

  searchBooks(query: any): Observable<any> {
    return this.http.get(`${this.baseUrl}${query}`);
  }

  //Add book to shelf:
  addBook(srcpath: string, book: Book): void {
    this.db.object(`${this.userpath}/${srcpath}/${book.id}`).set(book);
  }

  //Move Book method:
  moveBook(targetShelf: string, book: Book): void {
    if (book !== null) {
      this.db.object(`${this.userpath}/${targetShelf}/${book.id}`).set(book);
    }
  }

  //Get all Books method:
  getBookslist(srcpath: string): Observable<Book[]> {
    return this.db.list<Book>(`${this.userpath}/${srcpath}`).valueChanges();
  }

  //Get book :
  getBook(srcpath: string, id: string): Observable<Book> {
    return this.db
      .object<Book>(`${this.userpath}/${srcpath}/${id}`)
      .valueChanges();
  }

  //delete book:
  deleteBook(srcpath: string, id: string):any {
    this.db.object(`${this.userpath}/${srcpath}/${id}`).remove();
  }
}
