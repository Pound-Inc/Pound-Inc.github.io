import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { OnboardingService } from 'src/app/admin/services/onboarding.service';
import { StepName } from 'src/app/model/steps.model';

@Component({
  selector: 'app-onboarding-step9',
  templateUrl: './onboarding-step9.component.html',
  styleUrls: ['./onboarding-step9.component.scss'],
})
export class OnboardingStep9Component implements OnInit {
  inputValue: NgbDateStruct;
  isInputValid: boolean = false;
  model: NgbDateStruct;
  form: FormGroup = new FormGroup({
    dob: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private onboardingService: OnboardingService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      dob: ['', [Validators.required]],
    });
  }

  checkValidity() {
    if (
      this.model &&
      !isNaN(this.model.year) &&
      !isNaN(this.model.month) &&
      !isNaN(this.model.day)
    ) {
      this.isInputValid = true;
    } else {
      this.isInputValid = false;
    }
  }

  onSubmitStep(): void {
    const date = this.form.value.dob;
    const dob = new Date(date.year + '-' + date.month + '-' + date.day);

    const data = { step: StepName.AGE, data: dob };
    this.onboardingService.setCurrentOnboardingStep(data);
  }
}
