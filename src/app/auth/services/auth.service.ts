import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, EMPTY } from 'rxjs';
import { AUTH_API } from 'src/common/constants/endpoints';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/model/user.model';
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

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public login(loginPayload: loginCredentials): Promise<User> {
    let response: User;
    return new Promise<User>((resolve, reject) => {
      return this.http
        .post<User>(`${AUTH_API}/login`, loginPayload, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: any) => {
            if (response) {
              localStorage.setItem('Authentication', response.token);

              const expires = new Date();
              expires.setSeconds(expires.getSeconds() + 21600);

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
    return new Promise<User>((resolve, reject) => {
      return this.http
        .get<User>(`${AUTH_API}/users/user/me/`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: any) => {
            if (response) {
              this.currentUser.next(response.user);
              this.isAuthenticated.next(true);
              return resolve(response);
            }
          },
          error: (error) => {
            console.log(error);

            return reject(error.errorMessage);
          },
        });
    });
  }

  logout(): void {
    this.isAuthenticated.next(false);
    this.currentUser.next(null);
    localStorage.removeItem('Authentication');
  }

  get authenticatedUser() {
    return this.currentUser.asObservable();
  }
}
