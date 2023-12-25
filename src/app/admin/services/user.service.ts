import { Injectable } from '@angular/core';
import { BehaviorSubject, of, firstValueFrom, map, catchError } from 'rxjs';
import { AUTH_API } from 'src/common/constants/endpoints';
import { API_Response } from 'src/common/interfaces/response.interface';
import { HeadersService } from 'src/common/services/headers.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user.model';
import { Coach } from 'src/app/model/coach.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _users$ = new BehaviorSubject<User[]>([]);

  constructor(
    private headersService: HeadersService,
    private http: HttpClient
  ) {
    this.getUsers().then((response: any) => {
      this._users$.next(response.data);
    });
  }

  get users() {
    return this._users$.asObservable();
  }

  async getUsers() {
    try {
      const response = await firstValueFrom(
        this.http
          .get<API_Response>(`${AUTH_API}/users`, {
            headers: this.headersService.getHeaders,
            withCredentials: true,
          })
          .pipe(
            map((response: API_Response) => {
              return {
                status: response.status,
                message: response.message,
                data: response.data,
              };
            })
          )
      );

      return response;
    } catch (error) {
      return error;
    }
  }

  async validateCreateUserFirstStep(userEmail: string) {
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
          }),
          catchError((error) => of(error))
        )
    );
  }

  async createNewUser(user: any) {
    return await firstValueFrom(
      this.http
        .post<API_Response>(`${AUTH_API}/users`, user, {
          withCredentials: true,
        })
        .pipe(
          map((response: API_Response) => {
            if (response) {
              localStorage.setItem('isUser', 'true');
              return response.data;
            }
          }),
          catchError((error) => of(error))
        )
    );
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

  private async insertGuest(userLocaleStorage: object) {
    await firstValueFrom(
      this.http
        .post<API_Response>(`${AUTH_API}/users/guest`, userLocaleStorage, {
          withCredentials: true,
        })
        .pipe(catchError((error) => of(error)))
    );
  }

  async getUserById(userId: string) {
    console.log(userId);
    
    return await firstValueFrom(
      this.http.get<any>(`${AUTH_API}/users/${userId}`).pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error) => of(error))
      )
    );
  }
}
