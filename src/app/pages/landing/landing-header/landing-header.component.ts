import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, Subject, takeUntil, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss'],
})
export class LandingHeaderComponent implements OnInit, OnDestroy {
  public navbarItems: any[];
  public active: boolean = false;
  @ViewChild('navbar', { static: true }) navbar: ElementRef;

  user: User;
  @Input() navActive: number;
  private authSubscription: Subscription;
  destroy$ = new Subject();

  constructor(
    private cdref: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) {
    this.navbarItems = [
      { title: `home`, routerLink: '' },
      { title: `programs`, routerLink: '/programs' },
      { title: `coaches`, routerLink: '/coaches' },
      {
        title: `categories`,
        routerLink: '',
        children: [
          {
            title: `nutrition`,
            isActive: false,
            routerLink: '/nutrition',
            image: 'https://pankind.org.au/media/1653/istock-854725402_900.jpg',
          },
          {
            title: `cardio`,
            isActive: false,
            routerLink: '/cardio',
            image:
              'https://blog.myfitnesspal.com/wp-content/uploads/2019/01/Essential-Guide-to-Hydration-1200x900.jpg',
          },
          {
            title: `power`,
            isActive: false,
            routerLink: '/power',
            image:
              'https://www.eatthis.com/wp-content/uploads/sites/4/2022/04/strength-training.jpg?quality=82&strip=all',
          },
        ],
      },
    ];
  }

  async ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        if (event.url === '/') {
          window.location.reload();
        }
      }
    });
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      } else {
        this.authService.getProfile().then((user) => {
          this.user = user;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();

    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  ngAfterContentChecked() {
    this.navbarItems.forEach((item, index) => {
      const selector = `li:nth-child(${index + 1})`;
      const element: HTMLElement =
        this.navbar.nativeElement.querySelector(selector);
      item.position = element;
    });
    this.cdref.detectChanges();
  }
}
