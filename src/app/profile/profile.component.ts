import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coach } from '../model/coach.model';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  translateBaseRoute = 'routing.coach.';
  public coach: Coach;
  constructor(private route: ActivatedRoute, config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.coach = data['coach'];
    });
  }

  ngAfterViewInit() {
    // Add  animations for other elements as needed
  }
}
