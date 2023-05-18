import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registrationForm: FormGroup;
  submitted = false;
  validPattern = "^[a-zA-Z0-9]{10}$";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: [
        '',
        [Validators.required, Validators.pattern(this.validPattern)]
      ],
      email: [
        '',
        [Validators.required, Validators.email, this.noWhitespaceValidator]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.noWhitespaceValidator
        ],
      ],
    });
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  get form() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.authService.createUser(
      this.form['username'].value,
      this.form['email'].value,
      this.form['password'].value
    );
  }
}
