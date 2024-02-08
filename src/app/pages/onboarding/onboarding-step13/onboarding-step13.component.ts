import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from 'src/app/admin/services/comment.service';
import { OnboardingService } from 'src/app/admin/services/onboarding.service';
import { ProgramService } from 'src/app/admin/services/program.service';
import { UserService } from 'src/app/admin/services/user.service';
import { ProgramComment } from 'src/app/model/comment.model';
import { StepName } from 'src/app/model/steps.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { User } from 'src/app/model/user.model';
import { register } from 'swiper/element';

@Component({
  selector: 'app-onboarding-step13',
  templateUrl: './onboarding-step13.component.html',
  styleUrls: ['./onboarding-step13.component.scss'],
})
export class OnboardingStep13Component {
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
      const data = { step: StepName.EMAIL, data: this.emailForm.value.email };
      this.onboardingService.setCurrentOnboardingStep(data);
    } else {
      this.isInputValid = false;
      setTimeout(() => {
        this.isInputValid = true;
      }, 3500);
      
    }
  }
}
