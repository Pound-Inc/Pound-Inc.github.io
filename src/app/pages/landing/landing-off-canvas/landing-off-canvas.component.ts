import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-landing-off-canvas',
  templateUrl: './landing-off-canvas.component.html',
  styleUrls: ['./landing-off-canvas.component.scss'],
})
export class LandingOffCanvasComponent {
  loading = false;
  loginForm: FormGroup;
  customers: any[] = [];
  user: any;
  users: any[] = [];
  services: any[] = [];
  userSubscription: Subscription;
  destroy$ = new Subject();
  isError = false;
  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  logout() {}
  submit() {}
}
