import { Component } from '@angular/core';
import { OnboardingService } from 'src/app/admin/services/onboarding.service';
import { OnboardingStep, StepName } from 'src/app/model/steps.model';

@Component({
  selector: 'app-onboarding-step7',
  templateUrl: './onboarding-step7.component.html',
  styleUrls: ['./onboarding-step7.component.scss'],
})
export class OnboardingStep7Component {
  inputValue: number;
  height: number;
  BMI: number;
  isInputValid: boolean = false;
  alert: { type: string; title: string; icon: string; text: string };
  normalWeightRange: any;

  constructor(private onboardingService: OnboardingService) {}

  calculateBMI() {
    const heightInMeters = this.height / 100;
    return this.inputValue / (heightInMeters * heightInMeters);
  }
  getHeight() {
    return this.onboardingService
      .getOnboardingData()
      .subscribe((data: OnboardingStep[]) => {
        const heightStep = data.find((d) => d.step === StepName.HEIGHT);
        this.height = heightStep?.data;
      });
  }

  checkValidity() {
    this.getHeight();
    this.isInputValid = this.inputValue >= 25 && this.inputValue <= 300;
    if (this.isInputValid) {
      this.BMI = parseInt(this.calculateBMI().toFixed(0));
      // get NORMAL WEIGHT!!
      const minNormalWeight = Math.round(17 * Math.pow(this.height / 100, 2));
      const maxNormalWeight = Math.round(26 * Math.pow(this.height / 100, 2));
      this.normalWeightRange = { min: minNormalWeight, max: maxNormalWeight };

      if (this.BMI <= 16) {
        // UNDERWEIGHT -->
        this.alert = {
          type: 'danger',
          title: 'underweight',
          icon: '',
          text: 'You have some work ahead of you, but it’s great that you’re taking this first step. We’ll use your BMI to create a program just for you.',
        };
      } else if (this.BMI >= 17 && this.BMI <= 26) {
        // NORMAL -->
        this.alert = {
          type: 'success',
          title: 'normal',
          icon: '',
          text: 'You’re starting from a great place! Now we’ll use your BMI to create a program tailored to your needs.',
        };
      } else if (this.BMI >= 27 && this.BMI <= 31) {
        // OVERWEIGHT -->
        this.alert = {
          type: 'warning',
          title: 'overweight',
          icon: '',
          text: 'You have some work ahead of you, but it’s great that you’re taking this first step. We’ll use your BMI to create a weight loss program just for you.',
        };
      } else {
        // OBESE -->
        this.alert = {
          type: 'danger',
          title: 'obese',
          icon: '',
          text: 'There’s a lot you could gain by losing a little weight. We’ll use your BMI to create the weight loss program you need.',
        };
      }
    }
  }

  onSubmitStep(): void {
    const data = {
      step: StepName.WEIGHT,
      data: {
        weight: this.inputValue,
        normalWeightRange: this.normalWeightRange,
        bmi: this.BMI,
      },
    };
    this.onboardingService.setCurrentOnboardingStep(data);
  }
}
