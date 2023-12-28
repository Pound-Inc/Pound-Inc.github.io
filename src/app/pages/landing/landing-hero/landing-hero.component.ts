import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-hero',
  templateUrl: './landing-hero.component.html',
  styleUrls: ['./landing-hero.component.scss'],
})
export class LandingHeroComponent {
  translateBaseRoute = 'routing.landing.hero.';
  isScrolled = false;
  public cat: { title: string; subTitle: string; icon: string }[];

  constructor() {
    this.cat = [
      {
        title: `${this.translateBaseRoute}cat.right.title`,
        subTitle: `${this.translateBaseRoute}cat.right.sub-title`,
        icon: `female`,
      },
      {
        title: `${this.translateBaseRoute}cat.left.title`,
        subTitle: `${this.translateBaseRoute}cat.left.sub-title`,
        icon: `male`,
      },
    ];
  }
}
