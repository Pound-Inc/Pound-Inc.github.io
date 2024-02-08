import { Component } from '@angular/core';
import { OnboardingService } from 'src/app/admin/services/onboarding.service';
import { StepName } from 'src/app/model/steps.model';

@Component({
  selector: 'app-onboarding-step2',
  templateUrl: './onboarding-step2.component.html',
  styleUrls: ['./onboarding-step2.component.scss'],
})
export class OnboardingStep2Component {
  public SHAPE_PHASES = [
    { title: 'slim', img: 'assets/imgs/common/shape-phase-female-slim.png' },
    {
      title: 'mid',
      img: 'assets/imgs/common/shape-phase-female-mid.png',
    },
    {
      title: 'big',
      img: 'assets/imgs/common/shape-phase-female-big.png',
    },
    {
      title: 'obese',
      img: 'assets/imgs/common/shape-phase-female-huge.png',
    },
  ];
  constructor(private onboardingService: OnboardingService) {}

  selectPhase(phase: string): void {
    const data = { step: StepName.BODY_SHAPE, data: phase };
    this.onboardingService.setCurrentOnboardingStep(data);
  }
}