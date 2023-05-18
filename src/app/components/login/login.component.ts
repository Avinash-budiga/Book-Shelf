import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/services/auth.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(private auth:AuthService){}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, this.noWhitespaceValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), this.noWhitespaceValidator])
    });
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  onSubmit() {
    this.submitted=true;
    this.auth.signInUser(this.email.value, this.password.value);
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
