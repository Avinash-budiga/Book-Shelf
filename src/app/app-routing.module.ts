import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
