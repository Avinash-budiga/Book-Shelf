import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(private auth:AngularFireAuth, private db:AngularFireDatabase, private router:Router) {}
  
  //signin method:
  SignInUser(email:string, password:string) {
    this.auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      localStorage.setItem('user', userCredential.user.uid);
      this.router.navigate(['/bookshelf']);
    })
    .catch(error => {
      this.router.navigate(['/login']);
    });
  };

  //signup method:
  CreateUser(email:any, pwd:any) {
    this.auth.createUserWithEmailAndPassword(email, pwd).then((userCredential)=>{
      let user = userCredential.user;
      this.router.navigate(['/login']);
    },(err)=>{
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

   //log out:
   SignOutUser() {
    this.auth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.userData = '';
      this.router.navigate(['/login']);
    }, (err)=>{
      alert(err.message);
    })
  }
}
