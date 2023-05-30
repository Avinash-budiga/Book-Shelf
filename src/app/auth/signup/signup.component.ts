import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { createUser } from 'src/interfaces/users';
import { signUp } from '../store/auth.actions';
import { setloader } from 'src/app/shared/store/shared.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registrationForm: FormGroup;
  submitted = false;
  validPattern = '^[a-zA-Z0-9]{10}$';

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: [
        '',
        [Validators.required, Validators.pattern(this.validPattern)],
      ],
      email: [
        '',
        [Validators.required, Validators.email, this.noWhitespaceValidator],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.noWhitespaceValidator,
        ],
      ],
    });
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  onSubmit() {
    this.submitted = true;
    const userdata: createUser = {
      username: this.registrationForm.controls['username'].value,
      email: this.registrationForm.controls['email'].value,
      password: this.registrationForm.controls['password'].value,
    };
    this.store.dispatch(setloader({ status: true }));
    this.store.dispatch(signUp({ userdata }));
  }
}
