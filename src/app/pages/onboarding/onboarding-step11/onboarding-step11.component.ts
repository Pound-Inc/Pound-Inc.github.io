import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { OnboardingService } from 'src/app/admin/services/onboarding.service';

@Component({
  selector: 'app-onboarding-step11',
  templateUrl: './onboarding-step11.component.html',
  styleUrls: ['./onboarding-step11.component.scss'],
})
export class OnboardingStep11Component implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: any = {};
  public isPossibleDuringRamadan: boolean;
  public weightDifference: number;
  public daysToAchieveGoal: number;

  constructor(private onboardingService: OnboardingService) {}
  ngOnInit(): void {
    this.onboardingService.getOnBoardingData().subscribe((stepData: any[]) => {
      const userWeightStep = stepData.find((d) => d.step === 6);

      const userGoalWeightStep = stepData.find((d) => d.step === 7);

      const INITIAL_WEIGHT = userWeightStep?.data.weight || 70;
      const GOAL_WEIGHT = userGoalWeightStep?.data.goal || 60;
      let GOAL_TYPE: 'LOSS' | 'GAIN' | 'SAME' = 'LOSS'; // get it from step 8

      this.weightDifference = INITIAL_WEIGHT - GOAL_WEIGHT;

      // Generate categories for 28 days
      const categories = Array.from({ length: 28 }, (_, index) => {
        if (index === 0) {
          return 'نقطة البداية';
        }
        return 'الأسبوع ' + (index + 1) / 7;
      });

      const calculateWeightForecast = (days: number) => {
        let weightLossRateDuringRamadan = 0;

        if (days === 7) {
          weightLossRateDuringRamadan = -0.5 - Math.random();
        } else if (days === 14) {
          weightLossRateDuringRamadan = -0.9 - Math.random();
        } else if (days === 21) {
          weightLossRateDuringRamadan = -1 - Math.random();
        } else if (days === 28) {
          weightLossRateDuringRamadan = -1.1 - Math.random();
        } else {
          weightLossRateDuringRamadan = -0.5 - Math.random();
        }

        const subtractWeight =
          INITIAL_WEIGHT + weightLossRateDuringRamadan * (days / 7);
        if (subtractWeight > GOAL_WEIGHT) {
          return subtractWeight;
        }
        return GOAL_WEIGHT + 0.1 * (days / 7);
      };

      if (INITIAL_WEIGHT - GOAL_WEIGHT <= 8 && GOAL_TYPE === 'LOSS') {
        this.isPossibleDuringRamadan = true;
      } else if (INITIAL_WEIGHT - GOAL_WEIGHT > 8 && GOAL_TYPE === 'LOSS') {
        this.isPossibleDuringRamadan = false;

        let remainingWeight = INITIAL_WEIGHT;
        this.daysToAchieveGoal = 0;
        while (remainingWeight > GOAL_WEIGHT) {
          const weightLossRate = -0.5 - Math.random();
          this.daysToAchieveGoal += 7;
          remainingWeight = parseInt(
            INITIAL_WEIGHT + weightLossRate * (this.daysToAchieveGoal / 7)
          );
          if (this.daysToAchieveGoal > 150) {
            break;
          }
        }
        this.daysToAchieveGoal = this.daysToAchieveGoal - 28;
      }

      // Calculate and display the weight at the end of each week (4 points in total)
      const data = Array.from({ length: 5 }, (_, weekIndex) => {
        if (weekIndex === 0) return { x: categories[0], y: INITIAL_WEIGHT };
        const endIndex = weekIndex * 7;

        const weeklyWeight = calculateWeightForecast(endIndex).toFixed(1);
        return { x: categories[endIndex - 1], y: parseFloat(weeklyWeight) };
      }).reverse();

      this.chartOptions = {
        tooltip: { enabled: false },
        dataLabels: {},
        grid: {},
        series: [
          {
            name: 'series1',
            data,
            colors: ['#000'],
          },
        ],
        chart: {
          type: 'area',
          toolbar: { show: false },
          zoom: { enabled: false },
        },
        stroke: {
          width: 7,
          curve: 'smooth',
          fill: {
            type: 'gradient',
            gradient: {
              type: 'horizontal',
              shadeIntensity: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#b2f0bb',
                  opacity: 1,
                },

                {
                  offset: 60,
                  color: '#f1ed82',
                  opacity: 1,
                },
                {
                  offset: 100,
                  color: '#fc8970',
                  opacity: 1,
                },
              ],
            },
          },
        },
        xaxis: {
          reversed: true,
          stepSize: 1,
          categories,
          labels: {
            minHeight: 30,
            style: {
              colors: [],
              fontSize: '5px',
              fontWeight: 400,
              fontFamily: 'Tajawal, sans-serif',
              cssClass: 'apexcharts-xaxis-label',
            },
          },
        },
        title: {
          text: '',
        },
        fill: {
          type: 'gradient',
          gradient: {
            type: 'horizontal',
            shadeIntensity: 1,
            colorStops: [
              {
                offset: 0,
                color: '#b2f0bb',
                opacity: 0.51,
              },

              {
                offset: 60,
                color: '#f1ed82',
                opacity: 0.51,
              },
              {
                offset: 100,
                color: '#fc8970',
                opacity: 0.51,
              },
            ],
          },
        },

        yaxis: {
          labels: {
            show: false,
          },
          min: INITIAL_WEIGHT - 10,
          max: INITIAL_WEIGHT + 10,
        },
      };
    });
  }

  onSubmitStep(): void {
    const data = { step: 8, data: null };
    this.onboardingService.setCurrentStepData(data);
  }
}
