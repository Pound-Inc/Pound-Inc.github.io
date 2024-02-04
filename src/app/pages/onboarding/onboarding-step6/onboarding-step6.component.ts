import { Component } from '@angular/core';
import { OnboardingService } from 'src/app/admin/services/onboarding.service';

@Component({
  selector: 'app-onboarding-step6',
  templateUrl: './onboarding-step6.component.html',
  styleUrls: ['./onboarding-step6.component.scss'],
})
export class OnboardingStep6Component {
  inputValue: number;
  isInputValid: boolean = false;

  constructor(private onboardingService: OnboardingService) {}

  checkValidity() {
    this.isInputValid = this.inputValue >= 90 && this.inputValue <= 243;
  }

  onSubmitStep(): void {
    const data = { step: 5, data: this.inputValue };
    this.onboardingService.setCurrentStepData(data);
  }
}
