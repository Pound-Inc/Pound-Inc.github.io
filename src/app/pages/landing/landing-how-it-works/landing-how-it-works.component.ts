import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-how-it-works',
  templateUrl: './landing-how-it-works.component.html',
  styleUrls: ['./landing-how-it-works.component.scss'],
})
export class LandingHowItWorksComponent {
  cards = [
    {
      title: `Trainer Approval Process`,
      subTitle: `Every trainer on our platform goes through a rigorous approval process, ensuring they're not just fitness enthusiasts, but professionals. Each trainer is certified and approved by a qualified physician to ensure the highest level of expertise.`,
      imgUrl: 'https://pankind.org.au/media/1653/istock-854725402_900.jpg',
    },
    {
      title: `Customized training programs`,
      subTitle: `Users have the power to shape their sporting journey. Choose your trainer and request a personal training program tailored to your needs, whether it's a 4-week challenge or a long-term commitment.`,
      imgUrl:
        'https://blog.myfitnesspal.com/wp-content/uploads/2019/01/Essential-Guide-to-Hydration-1200x900.jpg',
    },
    {
      title: `Verified by doctors`,
      subTitle: `To ensure the legitimacy and safety of each training program, each program undergoes a comprehensive examination by our team of certified doctors. This step ensures that each fitness program complies with health standards, giving you the reassurance you deserve.`,
      imgUrl:
        'https://www.eatthis.com/wp-content/uploads/sites/4/2022/04/strength-training.jpg?quality=82&strip=all',
    },
  ];
}
