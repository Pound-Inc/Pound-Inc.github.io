import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-how-it-works',
  templateUrl: './landing-how-it-works.component.html',
  styleUrls: ['./landing-how-it-works.component.scss'],
})
export class LandingHowItWorksComponent {
  translateBaseRoute = 'routing.landing.how-it-works.';
  cards = [
    {
      title: `${this.translateBaseRoute}cards.right.title`,
      subTitle: `${this.translateBaseRoute}cards.right.info`,
      imgUrl: 'https://pankind.org.au/media/1653/istock-854725402_900.jpg',
    },
    {
      title: `${this.translateBaseRoute}cards.middle.title`,
      subTitle: `${this.translateBaseRoute}cards.middle.info`,
      imgUrl:
        'https://blog.myfitnesspal.com/wp-content/uploads/2019/01/Essential-Guide-to-Hydration-1200x900.jpg',
    },
    {
      title: `${this.translateBaseRoute}cards.left.title`,
      subTitle: `${this.translateBaseRoute}cards.left.info`,
      imgUrl:
        'https://www.eatthis.com/wp-content/uploads/sites/4/2022/04/strength-training.jpg?quality=82&strip=all',
    },
  ];
}
