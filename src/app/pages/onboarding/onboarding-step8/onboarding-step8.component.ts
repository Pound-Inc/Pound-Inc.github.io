import { Component } from '@angular/core';
import { OnboardingService } from 'src/app/admin/services/onboarding.service';

@Component({
  selector: 'app-onboarding-step8',
  templateUrl: './onboarding-step8.component.html',
  styleUrls: ['./onboarding-step8.component.scss'],
})
export class OnboardingStep8Component {
  inputValue: number;
  weight: number;
  isInputValid: boolean = false;
  alert: { type: string; title: string; icon: string; text: string };
  calculation: any;
  normalWeightRange: any;

  constructor(private onboardingService: OnboardingService) {}

  calculatePercentage() {
    const goalWeight = this.inputValue;
    const percentageDifference: number =
      ((goalWeight - this.weight) / this.weight) * 100;

    enum GoalType {
      gain = 'gain',
      lose = 'lose',
      same = 'same',
    }

    const GOAL: GoalType =
      percentageDifference === 0
        ? GoalType.same
        : percentageDifference > 0
        ? GoalType.gain
        : GoalType.lose;

    const value = parseInt(Math.abs(percentageDifference).toFixed(0)) / 100;

    this.calculation = {
      type: GOAL,
      value,
      goal: goalWeight,
    };
    return {
      type: GOAL,
      value,
      goal: goalWeight,
    };
  }

  getWeight() {
    return new Promise<any>((resolve, reject) => {
      return this.onboardingService.getOnBoardingData().subscribe({
        next: (data: any[]) => {
          if (data) {
            const currentWeightStep = data.find((d) => d.step === 6);
            this.weight = currentWeightStep?.data.weight;
            this.normalWeightRange = currentWeightStep?.data.normalWeightRange;
            return resolve(this.weight);
          }
        },
        error: (error) => {
          return reject(error);
        },
      });
    });
  }

  async checkValidity() {
    this.isInputValid = this.inputValue >= 25 && this.inputValue <= 300;
    if (this.isInputValid) {
      await this.getWeight().then((data) => {
        const calculation = this.calculatePercentage();
        const valueAsNumber = calculation.value * 100;

        switch (calculation.type) {
          case 'gain':
            this.alert = {
              type: 'light',
              title: 'gain',
              icon: '',
              text: 'A study by the University of Utah found that working out just 5 minutes per day can maintain your level of fitness, improve energy levels, and lead to better sleep.',
            };
            break;

          case 'same':
            this.alert = {
              type: 'light',
              title: 'same',
              icon: '',
              text: 'You’re starting from a great place! Now we’ll use your BMI to create a program tailored to your needs.',
            };
            break;

          case 'lose':
            if (this.inputValue < this.normalWeightRange.min) {
              this.alert = {
                type: 'danger',
                title: 'lose',
                icon: '',
                text: '',
              };
            } else {
              this.alert = {
                type: 'light',
                title: 'lose',
                icon: '',
                text: 'The Mayo Clinic conducted a study which found that overweight people who lose 20% or more of their body weight are more than twice as likely to show improved metabolic health as those who only lose 5-10%.',
              };
            }

            break;
        }
      });
    }
  }

  onSubmitStep(): void {
    const data = { step: 7, data: this.calculation };
    this.onboardingService.setCurrentStepData(data);
  }
}
