import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnboardingService } from 'src/app/admin/services/onboarding.service';

@Component({
  selector: 'app-onboarding-step12',
  templateUrl: './onboarding-step12.component.html',
  styleUrls: ['./onboarding-step12.component.scss'],
})
export class OnboardingStep12Component {
  inputValue: string;
  isInputValid: boolean = true;
  emailForm: FormGroup;

  constructor(
    private onboardingService: OnboardingService,
    private formBuilder: FormBuilder
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmitStep() {
    if (this.emailForm.valid) {
      const data = { step: 11, data: this.emailForm.value.email };
      this.onboardingService.setCurrentStepData(data);
    } else {
      console.log('Invalid email');
    }
  }
}
