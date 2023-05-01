import { Component, OnInit } from '@angular/core';
import { Book } from '../../../interfaces/book';
import { BookService } from '../../../services/bookservice.service';
import {
  CdkDragDrop,
  CdkDragStart,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css'],
})
export class BookshelfComponent implements OnInit {
  currentlyReadingBooks: Array<Book>;
  wantToReadBooks: Array<Book>;
  readBooks: Array<Book>;
  allBooks: Array<Book>;
  timer: boolean;

  constructor(private bookservice: BookService) {}

  ngOnInit(): void {
    this.timer = false;
    this.wantToReadBooks = [];
    this.currentlyReadingBooks = [];
    this.readBooks = [];
    this.loadBooks('want-to-read', this.wantToReadBooks);
    this.loadBooks('currently-reading', this.currentlyReadingBooks);
    this.loadBooks('read-done', this.readBooks);
  }

  //load books method:get the books form db and load ino respective array;
  loadBooks(Shelf: string, shelfarray: Array<Book>) {
    this.bookservice.getBookslist(Shelf).subscribe((res) => {
      shelfarray.length = 0;
      Array.prototype.push.apply(shelfarray, res);
      this.combineBooks();
    });
  }

  //merge books:
  combineBooks(): void {
    if (this.wantToReadBooks && this.currentlyReadingBooks && this.readBooks) {
      this.allBooks = [
        ...this.wantToReadBooks,
        ...this.currentlyReadingBooks,
        ...this.readBooks,
      ];
      this.bookservice.bookinput.next(this.allBooks);
      this.timer = true;
    }
  }

  //move book method
  traverseBook(srcShelf: string, destShelf: string, id: string): void {
    this.bookservice.getBook(srcShelf, id).subscribe(
      (book: Book) => {
        if (book) {
          this.bookservice.moveBook(destShelf, book);
        }
        this.bookservice.deleteBook(srcShelf, id);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  //Remove book:
  removefromShelf(srcShelf: string, id: string): void {
    this.bookservice.deleteBook(srcShelf, id);
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
