import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  firstValueFrom,
  map,
  of,
} from 'rxjs';
import { ORDERS_API } from 'src/common/constants/endpoints';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HeadersService } from 'src/common/services/headers.service';
import { API_Response } from 'src/common/interfaces/response.interface';
import { Order } from 'src/app/model/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _orders$ = new BehaviorSubject<Order[]>([]);

  constructor(
    private http: HttpClient,
    private headersService: HeadersService
  ) {}

  async getRelatedOrders(userId: string) {
    return await firstValueFrom(
      this.http
        .get<API_Response>(`${ORDERS_API}/user/${userId}/`, {
          headers: this.headersService.getHeaders,
          withCredentials: true,
        })
        .pipe(
          map((response: API_Response) => {
            this._orders$.next(response.data);

            return {
              status: response.status,
              message: response.message,
              data: response.data,
              response: response.response,
            };
          })
        )
    );
  }
  async getOrders() {
    return await firstValueFrom(
      this.http
        .get<API_Response>(`${ORDERS_API}/`, {
          headers: this.headersService.getHeaders,
          withCredentials: true,
        })
        .pipe(
          map((response: API_Response) => {
            this._orders$.next(response.data);

            return {
              status: response.status,
              message: response.message,
              data: response.data,
            };
          })
        )
    );
  }

  setBilling(request: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authorization')}`,
    });
    if (headers) {
      console.log(headers.get('Authorization'));

      return this.http.post<any>(`${ORDERS_API}/set_billing`, request, {
        headers,
      });
    }
    return of(null);
  }
  async createNewOrder(request: any) {
    return await firstValueFrom(
      this.http
        .post<any>(`${ORDERS_API}`, request, {
          headers: this.headersService.getHeaders,
          withCredentials: true,
        })
        .pipe(
          map((response: any) => {
            return response;
          })
        )
    );
  }

  async getOrderById(orderId: string) {
    return await firstValueFrom(
      this.http
        .get<API_Response>(`${ORDERS_API}/${orderId}/`, {
          headers: this.headersService.getHeaders,
          withCredentials: true,
        })
        .pipe(
          map((response: any) => {
            return response;
          }),
          catchError((error) => of(error))
        )
    );
  }
  async getOrderByClientSecret(clientSecret: string) {
    return await firstValueFrom(
      this.http
        .get<API_Response>(`${ORDERS_API}/clientSecret/${clientSecret}/`, {
          headers: this.headersService.getHeaders,
          withCredentials: true,
        })
        .pipe(
          map((response: any) => {
            if (response) return response;
          })
        )
    );
  }

  get orders() {
    return this._orders$.asObservable();
  }
}
