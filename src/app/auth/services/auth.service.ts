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
  public currentUser = new BehaviorSubject<any>(null);

  redirectUrl: string | null = null;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private headersService: HeadersService
  ) {}

  login(loginPayload: { email: string; password: string }): Observable<any> {
    return this.http
      .post<any>(`${AUTH_API}/login`, loginPayload, {
        withCredentials: true,
      })
      .pipe(
        tap((response: any) => {
          if (response) {
            // Calculate the expiration date (2 days from now)
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 2);

            // Set the cookie with the expiration date
            this.cookieService.set(
              'authorization',
              response.Authentication,
              expirationDate,
              undefined,
              undefined,
              true,
              'None'
            );
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
    this.cookieService.delete('authorization');
  }

  async checkTokenValidity(): Promise<boolean> {
    if (this.headersService.getHeaders) {
      return await firstValueFrom(
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
            }),
            catchError((error) => {
              console.error('HTTP Error:', error);
              this.handleHttpError(error);
              return of(false);
            })
          )
      );
    }
    return false;
  }

  private handleHttpError(error: any): void {
    // Handle HTTP errors here, e.g., check for unauthorized status (401) and logout
    if (error.status === 401) {
      this.logout();
    }
    // Add more handling logic for other HTTP errors as needed
  }

  private handleNetworkError(error: any): void {
    // Handle network errors here, e.g., show a notification to the user
    console.error('Network error occurred:', error);
    // Add more handling logic for other network errors as needed
  }

  get getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }
}
