import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  translateBaseRoute = 'routing.auth.login.';
  message: string;

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    this.message = this.getMessage();
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getMessage() {
    return 'Logged ';
  }

  login() {
    this.message = 'Trying to log in ...';
    const loginObject: { email: string; password: string } =
      this.form.getRawValue();

    this.authService.login(loginObject).subscribe({
      next: () => {

        // this.message = this.getMessage();
        // if (this.authService.isLoggedIn) {
        //   const redirectUrl = '/admin';
        //   this.router.navigate([redirectUrl]);
        // }
      },
      error: (error) => {
        console.error('Login component error:', error);
      },
    });
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  logout() {
    this.authService.logout();
    this.message = this.getMessage();
  }
}
