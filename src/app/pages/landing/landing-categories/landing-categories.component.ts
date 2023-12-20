import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-categories',
  templateUrl: './landing-categories.component.html',
  styleUrls: ['./landing-categories.component.scss'],
})
export class LandingCategoriesComponent {
  translateBaseRoute = 'routing.landing.categories.';
  cards = [
    {
      title: `${this.translateBaseRoute}cards.right.title`,
      subTitle: `${this.translateBaseRoute}cards.right.sub-title`,
      imgUrl: 'https://pankind.org.au/media/1653/istock-854725402_900.jpg',
    },
    {
      title: `${this.translateBaseRoute}cards.middle.title`,
      subTitle: `${this.translateBaseRoute}cards.middle.sub-title`,
      imgUrl:
        'https://blog.myfitnesspal.com/wp-content/uploads/2019/01/Essential-Guide-to-Hydration-1200x900.jpg',
    },
    {
      title: `${this.translateBaseRoute}cards.left.title`,
      subTitle: `${this.translateBaseRoute}cards.left.sub-title`,
      imgUrl:
        'https://www.eatthis.com/wp-content/uploads/sites/4/2022/04/strength-training.jpg?quality=82&strip=all',
    },
  ];
}
