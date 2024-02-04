import { Component } from '@angular/core';
import { OnboardingService } from 'src/app/admin/services/onboarding.service';

@Component({
  selector: 'app-onboarding-step9',
  templateUrl: './onboarding-step9.component.html',
  styleUrls: ['./onboarding-step9.component.scss'],
})
export class OnboardingStep9Component {
  inputValue: number;
  isInputValid: boolean = false;

  constructor(private onboardingService: OnboardingService) {}

  checkValidity() {
    this.isInputValid = this.inputValue >= 18 && this.inputValue <= 90;
  }

  onSubmitStep(): void {
    const data = { step: 8, data: this.inputValue };
    this.onboardingService.setCurrentStepData(data);
  }
}
