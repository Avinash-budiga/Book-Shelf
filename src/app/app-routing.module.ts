import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksearchComponent } from './components/booksearch/booksearch.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { AuthrouteGuard } from 'src/guards/authroute.guard';

const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch:'full'},
  {path:'login',  component: LoginComponent},
  {path:'signup',  component: SignupComponent},
  {path:'booksearch',  component: BooksearchComponent, 
  canActivate: [AuthrouteGuard]
},
  {path:'bookshelf', component: BookshelfComponent,
   canActivate: [AuthrouteGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
