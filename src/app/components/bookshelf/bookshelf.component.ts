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
  allBooks:Array<Book>;
  timer: boolean;

  constructor(
    private bookservice: BookService
  ) { }

  ngOnInit(): void {
    this.timer = false;
    this.bookservice.getBookslist('want-to-read').subscribe((res) => {
      this.wantToReadBooks = res;
      this.combineBooks();
    });
    this.bookservice.getBookslist('currently-reading').subscribe((res) => {
      this.currentlyReadingBooks = res;
      this.combineBooks();
    });
    this.bookservice.getBookslist('read-done').subscribe((res) => {
      this.readBooks = res;
      this.combineBooks();
    });
  }
  //merge books:
  combineBooks(): void {
    if (this.wantToReadBooks && this.currentlyReadingBooks && this.readBooks) {
      this.allBooks = [...this.wantToReadBooks, ...this.currentlyReadingBooks, ...this.readBooks];
      this.bookservice.bookinput.next(this.allBooks);
      this.timer = true;
    }
  }

  //move book method
  traverseBook(srcShelf: string, destShelf: string, id: string): void {
    this.bookservice.getBook(srcShelf, id).subscribe((book: Book) => {
      if (book) {
        this.bookservice.moveBook(destShelf, book);
      }
      this.bookservice.deleteBook(srcShelf, id);
    }, (err) =>{
      console.error(err);
    }, ()=>{console.log('complete')});
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
