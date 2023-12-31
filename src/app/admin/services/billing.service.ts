// billing.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Billing } from 'src/app/model/billing.model';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  private billingDataSubject = new BehaviorSubject<Billing[]>([]);
  public test: any;

  updateBillingData(data: Billing[]) {
    this.test = data;

    this.billingDataSubject.next(data);
  }

  get billingData(): Observable<Billing[]> {
    return this.billingDataSubject.asObservable();
  }
}
