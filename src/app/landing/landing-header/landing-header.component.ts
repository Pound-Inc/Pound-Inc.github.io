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
  private translateBaseRoute = 'routing.landing.header.nav.';
  public navbarItems: any[];
  public active: boolean = false;
  @ViewChild('navbar', { static: true }) navbar: ElementRef;

  user: any;
  userSubscription: Subscription;
  destroy$ = new Subject();

  constructor(private cdref: ChangeDetectorRef) {
    this.navbarItems = [
      { title: `${this.translateBaseRoute}home`, routerLink: '' },
      { title: `${this.translateBaseRoute}service`, routerLink: '' },
      { title: `${this.translateBaseRoute}pricing`, routerLink: '' },
      {
        title: `${this.translateBaseRoute}products.products`,
        routerLink: '',
        children: [
          {
            title: `${this.translateBaseRoute}products.children.home`,
            isActive: false,
            routerLink: '',
            image: '',
          },
          {
            title: `${this.translateBaseRoute}products.children.home`,
            isActive: false,
            routerLink: '',
            image: '',
          },
          {
            title: `${this.translateBaseRoute}products.children.home`,
            isActive: false,
            routerLink: '',
            image: '',
          },
        ],
      },
      {
        title: `${this.translateBaseRoute}demos.demos`,
        children: [
          {
            title: `${this.translateBaseRoute}demos.home`,
            isActive: false,
            routerLink: '',
            image: '',
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

    console.log(window.innerHeight);

    let itemIndex = Math.floor(scrollPosition / 1800);

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
