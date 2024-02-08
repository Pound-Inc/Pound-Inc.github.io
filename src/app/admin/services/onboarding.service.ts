import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OnboardingStep } from 'src/app/model/steps.model';

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  private readonly onBoardingData = new BehaviorSubject<OnboardingStep[]>([]);
  private readonly stepData = new BehaviorSubject<any>({});
  private isSubmitting = false;

  private setOnboardingDataIntoLocalStorage() {
    const stepData = JSON.stringify(this.onBoardingData.value);
    localStorage.setItem('onBoardingSteps', stepData);
  }

  private getOnboardingDataFromLocalStorage(): OnboardingStep[] | null {
    const localStorageData = localStorage.getItem('onBoardingSteps');
    if (localStorageData) {
      try {
        return JSON.parse(localStorageData);
      } catch (error) {
        console.error('Error parsing local storage data:', error);
      }
    }
    return null;
  }

  public setCurrentOnboardingStep(data: OnboardingStep) {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    setTimeout(() => {
      this.stepData.next(data);
      this.setOnboardingData(data);
      this.isSubmitting = false;
    }, 1000);
  }

  public getCurrentOnboardingStep(): Observable<any> {
    return this.stepData.asObservable();
  }

  public setOnboardingData(stepData: OnboardingStep) {
    const prevData = this.onBoardingData.value;
    const newData = [...prevData, stepData];
    this.onBoardingData.next(newData);
    this.setOnboardingDataIntoLocalStorage();
  }

  public getOnboardingData(): Observable<OnboardingStep[]> {
    const localStorageData = this.getOnboardingDataFromLocalStorage();
    if (localStorageData) {
      this.onBoardingData.next(localStorageData);
    }
    return this.onBoardingData.asObservable();
  }
}
