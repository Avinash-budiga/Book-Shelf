import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import {
  CdkDragDrop,
  CdkDragStart,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Book } from 'src/interfaces/book';
import { Store } from '@ngrx/store';
import { BookshelfState } from 'src/interfaces/states';
import { loadBooks, moveBook } from '../store/shelf.actions';
import { getCurrentlyReadingBooks, getReadDoneBooks, getWantToReadBooks } from '../store/shelf.selectors';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css'],
})
export class BookshelfComponent implements OnInit {
  currentlyReadingBooks: Array<Book>;
  wantToReadBooks: Array<Book>;
  readDoneBooks: Array<Book>;
  allBooks: Array<Book>;

  constructor(private bookservice: BookService, private store: Store<BookshelfState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadBooks({shelf:'want-to-read'}));
    this.store.dispatch(loadBooks({shelf:'currently-reading'}));
    this.store.dispatch(loadBooks({shelf:'read-done'}));
    this.store.select(getCurrentlyReadingBooks).subscribe((data)=> {
      this.currentlyReadingBooks=data;
    });
    this.store.select(getWantToReadBooks).subscribe((data)=> {
      this.wantToReadBooks=data;
    });
    this.store.select(getReadDoneBooks).subscribe((data)=> {
      this.readDoneBooks=data;
    });
  }

  //move book method
  traverseBook(srcShelf: string, destShelf: string, id: string): void {
    this.store.dispatch(moveBook({srcShelf:srcShelf, destShelf:destShelf, bookId:id}));
    this.removefromShelf(srcShelf, id) ;
  }

  //Remove book:
  removefromShelf(srcShelf: string, id: string): void {
    this.bookservice.deleteBook(srcShelf, id)
  }

  //Drag and drop feature:
  drop(event: CdkDragDrop<Book[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.traverseBook(
        event.previousContainer.id,
        event.container.id,
        event.item.data.id
      );
    }
  }
}
