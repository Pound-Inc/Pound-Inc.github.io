import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  EMPTY,
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
import { loginCredentials } from 'src/common/constants/requests';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<any>(null);
  private headers: HttpHeaders;
  private authToken: string;

  redirectUrl: string | null = null;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.authToken = localStorage.getItem('Authentication') as string;

    this.headers = new HttpHeaders({
      Authentication: `Bearer ${this.authToken}`,
    });
  }

  public login(loginPayload: loginCredentials): Promise<User> {
    let response: User;
    return new Promise<User>((resolve, reject) => {
      return this.http
        .post<User>(`${AUTH_API}/login`, loginPayload, {
          headers: this.headers,
          withCredentials: true,
        })
        .subscribe({
          next: (response: any) => {
            if (response) {
              localStorage.setItem('Authentication', response.Authentication);

              // Calculate the expiration date (2 days from now)
              const expirationDate = new Date();
              expirationDate.setDate(expirationDate.getDate() + 2);

              this.cookieService.set(
                'Authentication',
                response.Authentication,
                expirationDate,
                undefined,
                undefined,
                true,
                undefined
              );
              this.currentUser.next(response.User);
              return resolve(response);
            }
          },
          error: (error) => {
            return reject(error.errorMessage);
          },
        });
    });
  }

  getProfile(): Promise<User> {
    let response: User;

    console.log(this.authToken);

    return new Promise<User>((resolve, reject) => {
      if (this.authToken) {
        return this.http
          .get<User>(`${AUTH_API}/users/user/me`, {
            headers: this.headers,
            withCredentials: true,
          })
          .subscribe({
            next: (response: any) => {
              if (response) {
                console.log(response);
                return resolve(response);
              }
            },
            error: (error) => {
              console.log(error);

              return reject(error.errorMessage);
            },
          });
      }
      return reject(EMPTY);
    });
  }

  logout(): void {
    this.isAuthenticated.next(false);
    this.currentUser.next(null);
    this.cookieService.delete('authorization');
    localStorage.removeItem('authorization');
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

  private setHeaders() {
    const token = this.cookieService.get('authorization');
    const tokenLocalStorage = localStorage.getItem('authorization');
    if (token || tokenLocalStorage) {
      this.headers = new HttpHeaders({
        Authorization: `Bearer ${tokenLocalStorage}`,
      });
    }
  }
}
