import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Userdata } from 'src/interfaces/userdata';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: Userdata;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {}

  //signin method:
  SignInUser(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        localStorage.setItem('user', userCredential.user.uid);
        this.router.navigate(['/bookshelf']);
      })
      .catch((error) => {
        this.router.navigate(['/login']);
      });
  }

  //signup method:
  CreateUser(username: string, email: any, pwd: any) {
    this.auth.createUserWithEmailAndPassword(email, pwd).then(
      (userCredential) => {
        this.userData = {
          username: username,
          email: userCredential.user.email,
          pwd: pwd,
          uid: userCredential.user.uid,
        };
        this.storeUser(this.userData);
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      }
    );
  }

  //log out:
  SignOutUser() {
    this.auth.signOut().then(
      () => {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  //store user-details:
  storeUser(userinfo: Userdata) {
    console.log(userinfo);
    this.db.object(`${userinfo.uid}/userdetails`).set(userinfo);
  }

  //get user details"
  getUser(userid: string):Observable<any> {
    return this.db.object(`${userid}/userdetails`).valueChanges();
  }
}
