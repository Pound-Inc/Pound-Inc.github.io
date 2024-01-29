import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-categories',
  templateUrl: './landing-categories.component.html',
  styleUrls: ['./landing-categories.component.scss'],
})
export class LandingCategoriesComponent {
  cards = [
    {
      title: `nutrition`,
      subTitle: `discover essential nutrition programs, meal plans and diet`,
      imgUrl: 'https://pankind.org.au/media/1653/istock-854725402_900.jpg',
      link: '/nutrition',
    },
    {
      title: `cardio`,
      subTitle: `fitness strategies to enhance endurance, burn calories, and improve overall heart health`,
      imgUrl:
        'https://blog.myfitnesspal.com/wp-content/uploads/2019/01/Essential-Guide-to-Hydration-1200x900.jpg',
      link: '/cardio',
    },
    {
      title: `power`,
      subTitle: `strength and routines to build muscle, boost endurance, and sculpt a stronger you`,
      imgUrl:
        'https://www.eatthis.com/wp-content/uploads/sites/4/2022/04/strength-training.jpg?quality=82&strip=all',
      link: '/power',
    },
  ];
}
