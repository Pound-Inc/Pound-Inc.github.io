import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnboardingService } from 'src/app/admin/services/onboarding.service';
import { StepName } from 'src/app/model/steps.model';

@Component({
  selector: 'app-onboarding-step14',
  templateUrl: './onboarding-step14.component.html',
  styleUrls: ['./onboarding-step14.component.scss'],
})
export class OnboardingStep14Component {
  inputValue: string;
  isInputValid: boolean = true;
  nameForm: FormGroup;

  constructor(
    private onboardingService: OnboardingService,
    private formBuilder: FormBuilder
  ) {
    this.nameForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  onSubmitStep() {
    if (this.nameForm.valid) {
      const data = { step: StepName.NAME, data: this.nameForm.value.name };
      this.onboardingService.setCurrentOnboardingStep(data);
    }
  }
}
