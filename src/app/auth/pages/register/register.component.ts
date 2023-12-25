import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/admin/services/user.service';
import Validation from 'src/app/utils/register.validation';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  translateBaseRoute = 'routing.auth.register.';
  invalidMessage: boolean = false;
  public step = 1;
  public firstInputs: any;
  public clientIpAddress: string;
  private httpSubscription: Subscription;

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.userService
      .validateCreateUserFirstStep(this.form.getRawValue().email)
      .then(() => {
        this.step = 2;
        this.firstInputs = this.form.value;
      })
      .catch(() => {
        this.invalidMessage = true;
        setTimeout(() => {
          this.invalidMessage = false;
        }, 5000);
      });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  rtl(element: any) {
    if (element.setSelectionRange) {
      element.setSelectionRange(0, 0);
    }
  }
  canDeactivate(): Observable<boolean> | boolean {
    const formObject = this.form.getRawValue();
    if (!formObject.name || !formObject.email) {
      return false;
    }
    return true;
  }
}
