import { Component, OnInit } from '@angular/core';
import { OnboardingService } from 'src/app/admin/services/onboarding.service';
import { StepName } from 'src/app/model/steps.model';

@Component({
  selector: 'app-onboarding-step10',
  templateUrl: './onboarding-step10.component.html',
  styleUrls: ['./onboarding-step10.component.scss'],
})
export class OnboardingStep10Component implements OnInit {
  private data: any[];
  public BMI: number;
  public BODY_TYPES: { name: string; description: string; img: string }[] = [
    {
      name: 'Ectomorph', // slender
      description: 'Slender, less fat percentage and muscle mass',
      img: 'assets/imgs/common/shape-phase-female-slim.png',
    },
    {
      name: 'Mesomorph', // good in shape
      description: 'Medium shape, more muscular.',
      img: 'assets/imgs/common/goal-shape-phase-female-curvy.png',
    },
    {
      name: 'Endomorph', // overweight
      description: 'loose skin and lack of muscular tone',
      img: 'assets/imgs/common/shape-phase-female-big.png',
    },
  ];

  constructor(private onboardingService: OnboardingService) {}
  ngOnInit(): void {
    this.onboardingService.getOnboardingData().subscribe((data: any[]) => {
      if (data) {
        console.log(data);
        this.BMI = data.find((item) => item.step === 6)?.data.bmi || 10;
        console.log(this.BMI);

        this.data = data;
      }
    });
  }

  calculateRightPosition() {
    //todo
    const userBMI = this.BMI;
    const minBmi = 8.5;
    const maxBmi = 39.5;
    const percentage = ((userBMI - minBmi) / (maxBmi - minBmi)) * 100;

    // Adjust for RTL layout by using "right" instead of "left"
    return `calc(${percentage}% - 15px)`;
  }

  onSubmitStep(): void {
    const data = { step: StepName.WELLNESS_PROFILE, data: null };
    this.onboardingService.setCurrentOnboardingStep(data);
  }
}
