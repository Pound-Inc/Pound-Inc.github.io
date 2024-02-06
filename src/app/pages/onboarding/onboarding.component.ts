import { Component, OnInit } from '@angular/core';
import { OnboardingService } from 'src/app/admin/services/onboarding.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
  public step: number;

  constructor(private onboardingService: OnboardingService) {}

  ngOnInit(): void {
    this.onboardingService.getOnBoardingData().subscribe((data: any[]) => {
      if (data.length === 0) {
        this.step = 12;
      } else {
        this.step = data.length;
        console.log(data);
      }
    });
  }
}
