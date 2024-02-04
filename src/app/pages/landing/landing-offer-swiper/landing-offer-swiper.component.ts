import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-landing-offer-swiper',
  templateUrl: './landing-offer-swiper.component.html',
  styleUrls: ['./landing-offer-swiper.component.scss'],
})
export class LandingOfferSwiperComponent {
  constructor() {
    register();
  }
}
