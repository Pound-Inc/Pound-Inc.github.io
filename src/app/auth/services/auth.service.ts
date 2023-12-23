import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  Observable,
  firstValueFrom,
  of,
  throwError,
} from 'rxjs';
import { tap, delay, catchError } from 'rxjs/operators';
import { AUTH_API } from 'src/common/constants/endpoints';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<any>(null);

  redirectUrl: string | null = null;

  constructor(private http: HttpClient, private cookieService: CookieService) {
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
            this.isAuthenticated.next(true);
          }
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          throw new Error(error);
        })
      );
  }

  logout(): void {
    this.isAuthenticated.next(false);
    this.currentUser.next(null);
    this.cookieService.delete('AUTH');
  }

  async checkTokenValidity(): Promise<boolean> {
    const token = this.cookieService.get('AUTH');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      try {
        const response = await firstValueFrom(
          this.http.get<any>(`${AUTH_API}/users/me`, {
            headers: headers,
            withCredentials: true,
          })
        );

        this.currentUser.next(response);
        this.isAuthenticated.next(true);

        return true;
      } catch (error) {
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
