import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/services/bookservice.service';
import { Observable, from, map } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booksearch',
  templateUrl: './booksearch.component.html',
  styleUrls: ['./booksearch.component.css'],
})
export class BooksearchComponent implements OnInit {
  searchedBooks: any[] = [];
  filterBooks: any;
  title: any;
  timer: Boolean = true;

  constructor(private bookservice: BookService, private router: Router) {}

  ngOnInit(): void {}

  onDataReceived(data: string) {
    this.timer = false;
    this.bookservice.searchBooks(data).subscribe((value) => {
      const filterBooks = value['items'];
      const book = filterBooks.find((item) => item.id === data);
      this.searchedBooks = book ? [book] : filterBooks;
      this.timer = true;
    });
  }

  //Add to shelf method:
  addtoShelf(srcShelf: string, bookid: string) {
    this.bookservice
      .searchBooks(bookid)
      .pipe(
        map((res) => {
          const filterBooks = res?.['items'] || [];
          const book = filterBooks.find((item) => item.id === bookid);
          const searchedBooks = book ? [book] : filterBooks;
          return {
            title: searchedBooks[0]?.volumeInfo?.title,
            author: searchedBooks[0]?.volumeInfo?.authors,
            id: searchedBooks[0]?.id,
            url: searchedBooks[0]?.volumeInfo?.imageLinks?.thumbnail,
          };
        })
      )
      .subscribe((book) => {
        if (this.isBookInShelf(book.id)) {
          Swal.fire('book already present in the shelf');
          
        } else {
          this.bookservice.addBook(srcShelf, book);
          Swal.fire(`Book added successfully to ${srcShelf}`);
          this.router.navigate(['/bookshelf']);
         
        }
      });
  }

  isBookInShelf(bookId: string): boolean {
    let bookFound = false;
    let result = [];
    this.bookservice.bookinput.subscribe((books) => {
      const book = books.find((b) => b.id === bookId);
      console.log(book);
      if (book) {
        bookFound = true;
      }
    });
    return bookFound;
  }
}
