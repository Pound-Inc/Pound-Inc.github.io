import { Component } from '@angular/core';
import { OnboardingService } from 'src/app/admin/services/onboarding.service';
import { StepName } from 'src/app/model/steps.model';

@Component({
  selector: 'app-onboarding-step5',
  templateUrl: './onboarding-step5.component.html',
  styleUrls: ['./onboarding-step5.component.scss'],
})
export class OnboardingStep5Component {
  selectedPhases: string[] = [];
  canSubmit: boolean = false;
  public SHAPE_PHASES: any[] = [];
  constructor(private onboardingService: OnboardingService) {
    const gender = localStorage.getItem('selectedGender') as string;

    this.SHAPE_PHASES = [
      {
        title: 'BACK',
        img: `assets/imgs/common/hurt-place-${gender}-back.png`,
      },
      {
        title: 'knee',
        img: `assets/imgs/common/hurt-place-${gender}-knee.png`,
      },
      {
        title: 'neck',
        img: `assets/imgs/common/hurt-place-${gender}-neck.png`,
      },
      {
        title: 'none',
        img: `assets/imgs/common/hurt-place-${gender}-none.png`,
      },
    ];
  }

  submitSelections(): void {
    const data = { step: StepName.PAIN_AREAS, data: this.selectedPhases };
    this.onboardingService.setCurrentOnboardingStep(data);
  }

  toggleSelection(phaseTitle: string): void {
    const index = this.selectedPhases.indexOf(phaseTitle);

    if (index === -1) {
      // Phase not selected, add it to the list
      if (phaseTitle !== 'none') {
        // If 'none' is selected, remove other selections
        if (this.selectedPhases.includes('none')) {
          this.selectedPhases = [phaseTitle];
        } else {
          this.selectedPhases.push(phaseTitle);
        }
      } else {
        // 'none' is selected, remove other selections
        this.selectedPhases = ['none'];
      }
    } else {
      // Phase already selected, remove it from the list
      this.selectedPhases.splice(index, 1);
    }

    if (this.selectedPhases.length > 0) {
      this.canSubmit = true;
    } else {
      this.canSubmit = false;
    }
  }

  isSelected(phaseTitle: string): boolean {
    return this.selectedPhases.includes(phaseTitle);
  }
}
