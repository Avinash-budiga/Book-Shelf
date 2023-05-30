import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as _action from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { userDetails, userInfo } from 'src/interfaces/users';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { setloader } from 'src/app/shared/store/shared.actions';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.state';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private AuthService: AuthService,
    private db: AngularFireDatabase,
    private store: Store<AuthState>,
    private router: Router
  ) {}

  //SignIn Effect:
  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(_action.signUp),
      mergeMap((action) => {
        return this.AuthService.signupUser(action.userdata).pipe(
          map((data: userInfo) => {
            this.db.object(`${data.userid}/userdetails`).set(data);
            this.store.dispatch(setloader({ status: false }));
            return _action.signupSuccess();
          }),
          catchError((error) => of(_action.signupFailure({ error })))
        );
      })
    );
  });

  //singupRedirect:
  signupredirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(_action.signupSuccess),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  //Login Effect:
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(_action.logIn),
      mergeMap((action) => {
        return this.AuthService.loginUser(action.userdata).pipe(
          map((data) => {
            this.store.dispatch(setloader({ status: false }));
            return _action.loginSucces({ userId: data.userId });
          }),
          catchError((error) => of(_action.loginFailure({ error })))
        );
      })
    );
  });

  //loginRedirect:
  loginredirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(_action.loginSucces),
        tap(() => {
          this.router.navigate(['/bookshelf']);
        })
      ),
    { dispatch: false }
  );

  //logout effect:
  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(_action.logOut),
      mergeMap(() => {
        return this.AuthService.logOut().pipe(
          map(() => {
            return _action.logoutSuccess();
          }),
          catchError((error) => of(_action.logoutFailure({ error })))
        );
      })
    );
  });

  //logoutredirect:
  logoutredirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(_action.logoutSuccess),
        tap(() => {
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );
}
