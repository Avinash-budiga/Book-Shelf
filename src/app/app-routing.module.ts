import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BookshelfComponent } from './shelf/bookshelf/bookshelf.component';
import { BooksearchComponent } from './shelf/booksearch/booksearch.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { HeaderComponent } from './shared/header/header.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'booksearch', component:BooksearchComponent, canActivate:[AuthGuard]},
  {path:'bookshelf', component:BookshelfComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
