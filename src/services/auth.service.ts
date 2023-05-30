import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, from, observable } from 'rxjs';
import {
  createUser,
  loginUser,
  userDetails,
  userInfo,
} from 'src/interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private Auth: AngularFireAuth,
    private db: AngularFireDatabase) {}

  //SignUp/CreateUser method:
  signupUser(user: createUser): Observable<userInfo> {
    return new Observable<userInfo>((observer) => {
      this.Auth.createUserWithEmailAndPassword(user.email, user.password)
        .then((response) => {
          const userdata: userInfo = {
            email: response.user.email,
            password: user.password,
            userid: response.user.uid,
            username: user.username,
          };
          observer.next(userdata);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  //Login method:
  loginUser(user: loginUser): Observable<userDetails> {
    return new Observable<userDetails>((observer) => {
      this.Auth.signInWithEmailAndPassword(user.email, user.password)
        .then((response) => {
          const userdata: userDetails = {
            userId: response.user.uid,
          };
          observer.next(userdata);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  //Logout method:
  logOut(): Observable<void> {
    return from(this.Auth.signOut());
  }

  //getuserdata:
  getUser(userid: string):Observable<any> {
    return this.db.object(`${userid}/userdetails`).valueChanges();
  }
}
