import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';
import { ORDERS_API } from 'src/common/constants/endpoints';
import { HttpClient } from '@angular/common/http';
import { API_Response } from 'src/common/interfaces/response.interface';
import { Order } from 'src/app/model/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly orders = new BehaviorSubject<Order[]>([]);
  public orders$ = this.orders.asObservable();

  constructor(private http: HttpClient) {}

  getRelatedOrders(userId: string) {
    return new Promise<Order[]>((resolve, reject) => {
      return this.http
        .get<API_Response>(`${ORDERS_API}/user/${userId}/`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: API_Response) => {
            this.orders.next(response.data);
            return resolve(response.data);
          },
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }
  getOrders() {
    return new Promise<Order[]>((resolve, reject) => {
      return this.http
        .get<API_Response>(`${ORDERS_API}/`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: API_Response) => {
            console.log(response);

            this.orders.next(response.data);
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
        .post<any>(`${ORDERS_API}/set_billing`, request, {
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

  async createNewOrder(request: any) {
    return new Promise<Order>((resolve, reject) => {
      return this.http
        .post<any>(`${ORDERS_API}`, request, {
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

  getOrderById(orderId: string) {
    return new Promise<Order>((resolve, reject) => {
      return this.http
        .get<Order>(`${ORDERS_API}/${orderId}/`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: Order) => {
            return resolve(response);
          },
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }
  getOrderByClientSecret(clientSecret: string) {
    return new Promise<Order>((resolve, reject) => {
      return this.http
        .get<API_Response>(`${ORDERS_API}/clientSecret/${clientSecret}/`, {
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

  async modifyOrderById(request: Order) {
    return new Promise<Order>((resolve, reject) => {
      return this.http
        .put<Order>(`${ORDERS_API}`, request, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: any) => {
            if (response) {
              return resolve(response.response);
            }
          },
          error: (error) => {
            return reject(error.errorMessage);
          },
        });
    });
  }

  async getOrdersByProgramId(programId: string) {
    return new Promise<Order[]>((resolve, reject) => {
      return this.http
        .get<Order[]>(`${ORDERS_API}/program/${programId}`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: any) => {
            if (response) {
              return resolve(response.response);
            }
          },
          error: (error) => {
            console.log(error);

            return reject(error.errorMessage);
          },
        });
    });
  }
}
