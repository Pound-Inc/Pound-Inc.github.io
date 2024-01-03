import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnChanges, OnDestroy {
  public user: User;
  private authSubscription: Subscription;
  constructor(private meta: Meta, private authService: AuthService) {}

  async ngOnInit() {
    await this.authService.checkTokenValidity();
    this.authSubscription = this.authService.getCurrentUser.subscribe(
      (user: User) => {
        if (user) {
          this.user = user;
        }
      }
    );

    this.meta.updateTag({
      name: 'description',
      content:
        'لأول مرة في الوطن العربي, إختر مدربك الخاص بك, لمدّة أنت تحددها.',
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes');
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
