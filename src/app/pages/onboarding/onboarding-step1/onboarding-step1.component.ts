import { Component } from '@angular/core';
import { OnboardingService } from 'src/app/admin/services/onboarding.service';

@Component({
  selector: 'app-onboarding-step1',
  templateUrl: './onboarding-step1.component.html',
  styleUrls: ['./onboarding-step1.component.scss'],
})
export class OnboardingStep1Component {
  public AGE_PHASES = [
    { title: '18-29', img: 'assets/imgs/common/age-phase-female-20.png' },
    { title: '30-39', img: 'assets/imgs/common/age-phase-female-30.png' },
    { title: '40-49', img: 'assets/imgs/common/age-phase-female-40.png' },
    { title: '+50', img: 'assets/imgs/common/age-phase-female-50.png' },
  ];
  constructor(private onboardingService: OnboardingService) {}

  selectPhase(phase: string): void {
    const data = { step: 0, data: phase };
    this.onboardingService.setCurrentStepData(data);
  }
}
