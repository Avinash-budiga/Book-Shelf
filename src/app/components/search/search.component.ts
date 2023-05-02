import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BookService } from '../../../services/bookservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchQuery: any = '';
  category: any = 'Category';
  suggestions: any;
  @Output() dataEvent = new EventEmitter<string>();

  constructor(private bookService: BookService, private router:Router) {}

  ngOnInit(): void {}

  onSearch() {
    if (this.searchQuery) {
      this.bookService
        .search(this.searchQuery)
        .subscribe((response: any) => {
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
    this.emitBookInput(query);
    this.suggestions = [];
    this.router.navigate(['/booksearch']);
  }

  emitBookInput(query: string) {
    this.dataEvent.emit(query);
  }
}
