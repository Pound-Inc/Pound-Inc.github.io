import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-hero',
  templateUrl: './landing-hero.component.html',
  styleUrls: ['./landing-hero.component.scss'],
})
export class LandingHeroComponent {
  isScrolled = false;
  public cat: {
    title: string;
    type: string;
    subTitle: string;
    icon: string;
    imgUrl: string;
  }[];

  constructor() {
    this.cat = [
      {
        title: `females`,
        type: `female`,
        subTitle: `professional training programs for females to achieve your goals.`,
        icon: `female`,
        imgUrl: 'assets/imgs/common/felames-background.png',
      },
      {
        title: `males`,
        type: `male`,
        subTitle: `professional training programs for males to achieve your goals.`,
        icon: `male`,
        imgUrl: 'assets/imgs/common/males-background.png',
      },
    ];
  }

  onCardClick(gender: string) {
    localStorage.setItem('selectedGender', gender);
  }
}
