import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/material/material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EffectsModule } from '@ngrx/effects';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { AuthReducer } from './auth/store/auth.reducers';
import { sharedReducer } from './shared/store/shared.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { BooksearchComponent } from './shelf/booksearch/booksearch.component';
import { BookshelfComponent } from './shelf/bookshelf/bookshelf.component';
import { shelfReducer } from './shelf/store/shelf.reducers';
import { ShelfEffects } from './shelf/store/shelf.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    LoaderComponent,
    BookshelfComponent,
    BooksearchComponent,
  ],
  imports: [
    BrowserModule,
    
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    DragDropModule,
    EffectsModule.forRoot([ShelfEffects]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    StoreModule.forRoot({Auth: AuthReducer, Shared: sharedReducer, bookShelf:shelfReducer}),
    StoreDevtoolsModule.instrument({
      logOnly:environment.production,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
