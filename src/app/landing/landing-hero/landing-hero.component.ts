import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-landing-hero',
  templateUrl: './landing-hero.component.html',
  styleUrls: ['./landing-hero.component.scss'],
})
export class LandingHeroComponent {
  translateBaseRoute = 'routing.landing.hero.';
  isScrolled = false;
  public cat: { title: string; subTitle: string }[];

  constructor() {
    this.cat = [
      {
        title: `${this.translateBaseRoute}cat.right.title`,
        subTitle: `${this.translateBaseRoute}cat.right.sub-title`,
      },
      {
        title: `${this.translateBaseRoute}cat.left.title`,
        subTitle: `${this.translateBaseRoute}cat.left.sub-title`,
      },
    ];
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (scrollPosition >= 60) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
}
