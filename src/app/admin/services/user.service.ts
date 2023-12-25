import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  tap,
  debounceTime,
  switchMap,
  delay,
  Observable,
  of,
  firstValueFrom,
  map,
  catchError,
} from 'rxjs';
import { SortColumn, SortDirection } from '../sortable.directive';
import { Gender, User, UserRole } from 'src/app/model/user.model';
import { Coach } from 'src/app/model/coach.model';
import { AUTH_API } from 'src/common/constants/endpoints';
import { API_Response } from 'src/common/interfaces/response.interface';
import { HeadersService } from 'src/common/services/headers.service';
import { HttpClient } from '@angular/common/http';

interface SearchResult {
  users: User[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(users: User[], column: SortColumn, direction: string): User[] {
  if (direction === '' || column === 'name' || column === 'id') {
    return users;
  } else {
    return [...users].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(user: User, term: string) {
  return user.name.toLowerCase().includes(term.toLowerCase());
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _users$ = new BehaviorSubject<User[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 100,
    searchTerm: '',
    sortColumn: 'name',
    sortDirection: '',
  };

  constructor(
    private headersService: HeadersService,
    private http: HttpClient
  ) {
    this.getUsers().then((response: any) => {
      this._users$.next(response.data);
    });
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        switchMap(() => this._search()),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._users$.next(result.users);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get users() {
    return this._users$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      this._state;

    // 1. sort
    let users = sort(this._users$.getValue(), sortColumn, sortDirection);

    // 2. filter
    users = users.filter((user) => matches(user, searchTerm));
    const total = users.length;

    // 3. paginate
    users = users.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({ users: users, total });
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
              await firstValueFrom(
                this.http
                  .post<API_Response>(
                    `${AUTH_API}/users/guest`,
                    userLocaleStorage,
                    {
                      withCredentials: true,
                    }
                  )
                  .pipe(catchError((error) => of(`Bad Promise: ${error}`)))
              );
              return;
            }
          })
        )
      );
    }
    return;
  }
}
