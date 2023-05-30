import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Store } from '@ngrx/store';
import { setloader } from 'src/app/shared/store/shared.actions';
import { logIn } from '../store/auth.actions';
import { loginUser } from 'src/interfaces/users';
import { AuthState } from '../store/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(private store: Store<AuthState>) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        this.noWhitespaceValidator,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        this.noWhitespaceValidator,
      ]),
    });
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  onSubmit() {
    this.submitted = true;
    const userdata: loginUser = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };
    this.store.dispatch(setloader({ status: true }));
    this.store.dispatch(logIn({ userdata }));
  }
}
