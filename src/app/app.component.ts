import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getloader } from './shared/store/shared.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'Book-Shelf';
  showloader: Observable<boolean>;
  constructor(private store: Store){}

  ngOnInit(): void {
    this.showloader=this.store.select(getloader);
  }
}
