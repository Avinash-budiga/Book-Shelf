import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isAuthenticated } from 'src/app/auth/store/auth.selectors';
import { AuthState } from 'src/app/auth/store/auth.state';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  isAuthenticated: Observable<boolean>;
  constructor( private store: Store<AuthState>){}

  ngOnInit(): void {
    this.isAuthenticated= this.store.select(isAuthenticated);
  }
  
}
