// billing.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Billing } from 'src/app/model/billing.model';
import { Payment } from 'src/app/model/payment.model';
import { BILLINGS_API } from 'src/common/constants/endpoints';
import { API_Response } from 'src/common/interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  private readonly billings = new BehaviorSubject<Payment[]>([]);
  public billings$ = this.billings.asObservable();

  constructor(private http: HttpClient) {}

  getBillingsByOrderIds(orderIds: string[]) {
    const request = { orderIds };
    return new Promise<Payment[]>((resolve, reject) => {
      return this.http
        .post<API_Response>(`${BILLINGS_API}/orders`, request, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: API_Response) => {
            this.billings.next(response.data);
            return resolve(response.data);
          },
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }
  getBillings() {
    return new Promise<Payment[]>((resolve, reject) => {
      return this.http
        .get<API_Response>(`${BILLINGS_API}/`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: API_Response) => {
            this.billings.next(response.data);
            return resolve(response.data);
          },
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }

  setBilling(request: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return this.http
        .post<any>(`${BILLINGS_API}/set_billing`, request, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: any) => {
            if (response) {
              return resolve(response);
            }
          },
          error: (error) => {
            return reject(error.errorMessage);
          },
        });
    });
  }

  async createNewBilling(request: any) {
    return new Promise<Billing>((resolve, reject) => {
      return this.http
        .post<any>(`${BILLINGS_API}`, request, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: API_Response) => {
            return resolve(response?.data);
          },
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }

  getBillingById(billingId: string) {
    return new Promise<Billing>((resolve, reject) => {
      return this.http
        .get<Billing>(`${BILLINGS_API}/${billingId}/`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: Billing) => {
            return resolve(response);
          },
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }
  getBillingByClientSecret(clientSecret: string) {
    return new Promise<Billing>((resolve, reject) => {
      return this.http
        .get<API_Response>(`${BILLINGS_API}/clientSecret/${clientSecret}/`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: API_Response) => {
            return resolve(response?.data);
          },
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }

  async modifyBillingById(request: Billing) {
    return new Promise<Billing>((resolve, reject) => {
      return this.http
        .put<Billing>(`${BILLINGS_API}`, request, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: any) => {
            if (response) {
              return resolve(response.data);
            }
          },
          error: (error) => {
            return reject(error.errorMessage);
          },
        });
    });
  }

  async getBillingsByProgramId(programId: string) {
    return new Promise<Payment[]>((resolve, reject) => {
      return this.http
        .get<Payment[]>(`${BILLINGS_API}/program/${programId}`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: any) => {
            if (response) {
              return resolve(response.data);
            }
          },
          error: (error) => {
            return reject(error.errorMessage);
          },
        });
    });
  }
}
