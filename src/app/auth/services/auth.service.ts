import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, EMPTY, Subject, catchError, of, tap } from 'rxjs';
import { AUTH_API } from 'src/common/constants/endpoints';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/model/user.model';
import { loginCredentials } from 'src/common/constants/requests';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authenticated = new Subject<boolean>();
  public authenticated$ = this.authenticated.asObservable();

  private readonly user = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user.asObservable();

  constructor(private http: HttpClient) {}

  public logout() {
    localStorage.removeItem('isLoggedIn');
    return new Promise<any>((resolve, reject) => {
      return this.http
        .post<any>(
          `${AUTH_API}/logout`,
          {},
          {
            withCredentials: true,
          }
        )
        .subscribe({
          next: (user: any) => {},
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }

  public login(loginPayload: loginCredentials): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      return this.http
        .post<User>(`${AUTH_API}/login`, loginPayload, {
          withCredentials: true,
        })
        .subscribe({
          next: (user: any) => {
            if (user) {
              localStorage.setItem('isLoggedIn', 'true');
              this.user.next(user);
              return resolve(user);
            }
          },
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }

  getProfile(): Promise<User> {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    return new Promise<User>((resolve, reject) => {
      if (isLoggedIn) {
        return this.http
          .get<User>(`${AUTH_API}/users/me/`, {
            withCredentials: true,
          })
          .subscribe({
            next: (user: User) => {
              if (user) {
                this.user.next(user);
                this.authenticated.next(true);
                return resolve(user);
              }
            },
            error: (error) => {
              this.logout();
            },
          });
      } else {
        this.logout();

        return;
      }
    });
  }
}
