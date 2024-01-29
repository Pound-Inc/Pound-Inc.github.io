import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-hero',
  templateUrl: './landing-hero.component.html',
  styleUrls: ['./landing-hero.component.scss'],
})
export class LandingHeroComponent {
  isScrolled = false;
  public cat: { title: string; subTitle: string; icon: string }[];

  constructor() {
    this.cat = [
      {
        title: `females`,
        subTitle: `professional training programs for females to achieve your goals.`,
        icon: `female`,
      },
      {
        title: `males`,
        subTitle: `professional training programs for males to achieve your goals.`,
        icon: `male`,
      },
    ];
  }
}
