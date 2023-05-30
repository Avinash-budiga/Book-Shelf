import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { BookService } from 'src/services/book.service';
import Swal from 'sweetalert2';
import { addToShelf } from '../store/shelf.actions';

@Component({
  selector: 'app-booksearch',
  templateUrl: './booksearch.component.html',
  styleUrls: ['./booksearch.component.css'],
})
export class BooksearchComponent {
  searchQuery: any = '';
  category: any = 'Category';
  suggestions: any;
  searchedBooks: Array<any>;
  filterBooks: any;
  title: any;

  constructor(private bookService: BookService, private router: Router, private store: Store) {}

  ngOnInit(): void {}

  onSearch() {
    if (this.searchQuery) {
      this.bookService.search(this.searchQuery).subscribe((response: any) => {
        this.suggestions = response.items || [];
      });
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: any) {
    this.searchQuery = suggestion.volumeInfo.title;
    const query =
      this.category === 'Category'
        ? suggestion.volumeInfo.title
        : suggestion.id;
    this.suggestions = [];
    this.bookService.searchBooks(query).subscribe((value) => {
      const filterBooks = value['items'];
      const book = filterBooks.find((item) => item.id === query);
      this.searchedBooks = book ? [book] : filterBooks;
    });
  }

  //Add to shelf method:
  addToShelf(srcShelf: string, bookid: string) {
    console.log('hello');
    this.store.dispatch(addToShelf({srcShelf, bookid}));
    console.log("afterdispatch");
  }

  isBookInShelf(bookId: string): boolean {
    let bookFound = false;
    this.bookService.bookinput.subscribe((books) => {
      const book = books.find((shelfbook) => shelfbook.id === bookId);
      if (book) {
        bookFound = true;
      }
    });
    return bookFound;
  }
}
