import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnboardingService {
  private readonly onBoardingData = new BehaviorSubject<any[]>([]);
  private readonly stepData = new BehaviorSubject<any>({});
  private isSubmitting: boolean = false;

  public setCurrentStepData(data: any) {
    if (this.isSubmitting) return;
    this.isSubmitting = !this.isSubmitting;
    setTimeout(() => {
      this.stepData.next(data);
      this.setOnBoardingData(data);
      this.isSubmitting = !this.isSubmitting;
    }, 1000);
  }

  public getCurrentStepData(): Observable<any> {
    return this.stepData.asObservable();
  }

  public setOnBoardingData(stepData: any) {
    const prevData = this.onBoardingData.value;
    const newData = [...prevData, stepData];
    this.onBoardingData.next(newData);
  }

  public getOnBoardingData(): Observable<any> {
    return this.onBoardingData.asObservable();
  }
}
