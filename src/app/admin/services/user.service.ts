import { Injectable } from '@angular/core';
import { of, firstValueFrom, map, catchError, Subject, BehaviorSubject } from 'rxjs';
import { AUTH_API } from 'src/common/constants/endpoints';
import { API_Response } from 'src/common/interfaces/response.interface';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly users = new BehaviorSubject<User[]>([]);
  public users$ = this.users.asObservable();

  constructor(private http: HttpClient) {}

  getUsers() {
    return new Promise<User[]>((resolve, reject) => {
      return this.http
        .get<API_Response>(`${AUTH_API}/users/`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: API_Response) => {
            this.users.next(response.data);
            return resolve(response.data);
          },
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }

  createNewUser(user: any) {
    return new Promise<User>((resolve, reject) => {
      return this.http
        .post<API_Response>(`${AUTH_API}/users/user`, user, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: API_Response) => {
            if (response) {
              localStorage.setItem('isUser', 'true');
              return resolve(response.data);
            }
          },
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }

  async setUserInfo(clientIpAddress: string) {
    //check if exists already
    if (!localStorage.getItem('userInfo')) {
      return await firstValueFrom(
        this.http.get<any>(`https://ipwho.is/${clientIpAddress}`).pipe(
          map(async (response) => {
            if (response) {
              const userLocaleStorage = {
                ip: response.ip,
                continent: response.continent,
                continent_code: response.continent_code,
                country: response.country,
                country_code: response.country_code,
                region: response.region,
                city: response.city,
                postal: response.postal,
                flag: response.flag,
                timezone: response.timezone,
              };
              localStorage.setItem(
                'userInfo',
                JSON.stringify(userLocaleStorage)
              );

              // insert to guests
              this.insertGuest(userLocaleStorage);

              return;
            }
          })
        )
      );
    }
    return;
  }

  private insertGuest(userLocaleStorage: object) {
    return new Promise<User>((resolve, reject) => {
      return this.http
        .post<API_Response>(`${AUTH_API}/users/guest`, userLocaleStorage, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: API_Response) => {
            resolve(response.data);
          },
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }

  getUserById(userId: string) {
    return new Promise<User>((resolve, reject) => {
      return this.http
        .get<User>(`${AUTH_API}/users/user/${userId}`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: User) => {
            resolve(response);
          },
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }

  async validateCreateUserFirstStep(userEmail: string) {
    try {
      return await firstValueFrom(
        this.http
          .post<any>(
            `${AUTH_API}/users/validateEmail`,
            { email: userEmail },
            {
              withCredentials: true,
            }
          )
          .pipe(
            map((response: any) => {
              if (response) {
                return;
              }
            })
          )
      );
    } catch (error) {
      throw new Error('error');
    }
  }
}
