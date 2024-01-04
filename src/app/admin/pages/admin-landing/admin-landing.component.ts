import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Coach } from 'src/app/model/coach.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.scss'],
})
export class AdminLandingComponent implements OnInit, OnDestroy {
  user: User | Coach;

  private routeSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService.getProfile().subscribe((user) => {
      this.user = user;
    });
  }
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  isBasicUser() {
    if (
      !this.user.roles.Super &&
      !this.user.roles.Admin &&
      !this.user.roles.Mod &&
      !this.user.roles.Worker
    ) {
      return true;
    }
    return false;
  }
}
