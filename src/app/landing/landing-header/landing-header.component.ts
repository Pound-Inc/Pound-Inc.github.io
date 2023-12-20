import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss'],
})
export class LandingHeaderComponent implements OnInit, OnDestroy {
  public translateBaseRoute = 'routing.landing.header.nav.';
  public navbarItems: any[];
  public active: boolean = false;
  @ViewChild('navbar', { static: true }) navbar: ElementRef;

  user: any;
  userSubscription: Subscription;
  destroy$ = new Subject();

  constructor(private cdref: ChangeDetectorRef) {
    this.navbarItems = [
      { title: `${this.translateBaseRoute}home`, routerLink: '' },
      { title: `${this.translateBaseRoute}programs`, routerLink: '/programs' },
      { title: `${this.translateBaseRoute}coaches`, routerLink: '/coaches' },
      {
        title: `${this.translateBaseRoute}categories.categories`,
        routerLink: '',
        children: [
          {
            title: `${this.translateBaseRoute}categories.children.nutrition`,
            isActive: false,
            routerLink: '',
            image: 'https://pankind.org.au/media/1653/istock-854725402_900.jpg',
          },
          {
            title: `${this.translateBaseRoute}categories.children.cardio`,
            isActive: false,
            routerLink: '',
            image:
              'https://blog.myfitnesspal.com/wp-content/uploads/2019/01/Essential-Guide-to-Hydration-1200x900.jpg',
          },
          {
            title: `${this.translateBaseRoute}categories.children.strength`,
            isActive: false,
            routerLink: '',
            image:
              'https://www.eatthis.com/wp-content/uploads/sites/4/2022/04/strength-training.jpg?quality=82&strip=all',
          },
        ],
      },
    ];
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
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

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.pageYOffset;

    let itemIndex = Math.floor(scrollPosition / 1000);

    if (scrollPosition >= window.innerHeight) {
    }

    if (itemIndex < this.navbarItems.length) {
      const item = this.navbarItems[itemIndex];

      if (item.position !== undefined) {
        for (const item of this.navbarItems) {
          if (item.position !== undefined) {
            item.position.classList.remove('active');
          }
        }

        item.position.classList.add('active');
        this.active = true;
      }
    } else {
      this.active = false;
    }
  }

  scrollToElement(element: HTMLElement) {
    element.scrollTo({ top: 100 });
  }
}
