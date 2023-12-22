import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { tap, delay, catchError } from 'rxjs/operators';
import { AUTH_API } from 'src/common/constants/endpoints';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  user: User;
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
            console.log(response);
            this.cookieService.set('AUTH', response.Authentication);

            this.isLoggedIn = true;
          }
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          throw new Error(error);
        })
      );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.cookieService.delete('AUTH');
  }

  checkTokenValidity(): void {
    const token = this.cookieService.get('AUTH');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.http
        .get<any>(`${AUTH_API}/users/me`, {
          headers: headers,
          withCredentials: true,
        })
        .subscribe({
          next: (response) => {
            this.isLoggedIn = true;
            this.user = response;
          },
          error: (error) => {
            this.logout();
          },
        });
    } else {
      this.logout();
    }
  }
}
