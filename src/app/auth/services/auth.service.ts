import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  Observable,
  firstValueFrom,
  of,
  throwError,
} from 'rxjs';
import { tap, delay, catchError, map } from 'rxjs/operators';
import { AUTH_API } from 'src/common/constants/endpoints';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/model/user.model';
import { HeadersService } from 'src/common/services/headers.service';
import { API_Response } from 'src/common/interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<any>(null);

  redirectUrl: string | null = null;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private headersService: HeadersService
  ) {
    this.checkTokenValidity();
  }

  login(loginPayload: { email: string; password: string }): Observable<any> {
    return this.http
      .post<any>(`${AUTH_API}/login`, loginPayload, {
        withCredentials: true,
      })
      .pipe(
        tap((response: any) => {
          if (response) {
            this.cookieService.set('AUTH', response.Authentication);
            this.checkTokenValidity();
          }
        }),
        catchError((error) => {
          return error;
        })
      );
  }

  logout(): void {
    this.isAuthenticated.next(false);
    this.currentUser.next(null);
    this.cookieService.delete('AUTH');
  }

  async checkTokenValidity(): Promise<boolean> {
    if (this.headersService.getHeaders) {
      try {
        const response = await firstValueFrom(
          this.http
            .get<any>(`${AUTH_API}/users/me`, {
              headers: this.headersService.getHeaders,
              withCredentials: true,
            })
            .pipe(
              map((user) => {
                this.currentUser.next(user);
                this.isAuthenticated.next(true);
                return true;
              })
            )
        );
      } catch (error) {
        console.log('here???', error);

        this.logout();
      }
    }
    return false;
  }

  get getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }
}
