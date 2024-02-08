import { Component } from '@angular/core';
import { OnboardingService } from 'src/app/admin/services/onboarding.service';
import { StepName } from 'src/app/model/steps.model';

@Component({
  selector: 'app-onboarding-step3',
  templateUrl: './onboarding-step3.component.html',
  styleUrls: ['./onboarding-step3.component.scss'],
})
export class OnboardingStep3Component {
  public GOAL_SHAPE_PHASES = [
    {
      title: 'thin',
      img: 'assets/imgs/common/goal-shape-phase-female-toned.png',
    },
    {
      title: 'detailed',
      img: 'assets/imgs/common/goal-shape-phase-female-thin.png',
    },
    {
      title: 'shredded',
      img: 'assets/imgs/common/goal-shape-phase-female-shred.png',
    },
    {
      title: 'curvy',
      img: 'assets/imgs/common/goal-shape-phase-female-curvy.png',
    },
  ];
  constructor(private onboardingService: OnboardingService) {}

  selectPhase(phase: string): void {
    const data = { step: StepName.DREAM_BODY_SHAPE, data: phase };
    this.onboardingService.setCurrentOnboardingStep(data);
  }
}
