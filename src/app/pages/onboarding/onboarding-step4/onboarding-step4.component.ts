import { Component } from '@angular/core';
import { OnboardingService } from 'src/app/admin/services/onboarding.service';
import { StepName } from 'src/app/model/steps.model';

@Component({
  selector: 'app-onboarding-step4',
  templateUrl: './onboarding-step4.component.html',
  styleUrls: ['./onboarding-step4.component.scss'],
})
export class OnboardingStep4Component {
  public LAST_TIME_BEST_SHAPE = [
    'less than a year',
    '1-2 years ago',
    'more than 3 years ago',
    'never',
  ];
  constructor(private onboardingService: OnboardingService) {}

  selectPhase(phase: string): void {
    const data = { step: StepName.LAST_TIME_BEST_BODY_SHAPE, data: phase };
    this.onboardingService.setCurrentOnboardingStep(data);
  }
}
