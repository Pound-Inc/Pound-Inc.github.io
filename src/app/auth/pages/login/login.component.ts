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
import { ToastComponent } from 'src/common/components/toast/toast.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  translateBaseRoute = 'routing.auth.login.';
  invalidMessage = false;
  valid = false;

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}
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

  login() {
    const loginObject: { email: string; password: string } =
      this.form.getRawValue();

    this.authService
      .login(loginObject)
      .then(() => {
        this.valid = true;
        setTimeout(() => {
          this.valid = false;
          const redirectUrl = '/';
          this.router.navigate([redirectUrl]);
        }, 2000);
      })
      .catch(() => {
        this.invalidMessage = true;
        setTimeout(() => {
          this.invalidMessage = false;
        }, 5000);
      });
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    JSON.stringify(this.form.value, null, 2);
  }

  logout() {
    this.authService.logout();
  }
}
