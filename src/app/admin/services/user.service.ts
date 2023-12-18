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
} from 'rxjs';
import { SortColumn, SortDirection } from '../sortable.directive';
import { User, UserRole } from 'src/app/model/user.model';

interface SearchResult {
  users: User[];
  total: number;
}
export const USERS: User[] = [
  {
    id: '65801ee6146142ca59388218',
    img: 'http://placehold.it/32x32',
    name: 'Ochoa Hancock',
    email: 'ochoahancock@zentix.com',
    location: '774 Sullivan Street, Murillo, Oklahoma, 158',
    dob: '2020-05-07T02:04:55',
    role: UserRole.Admin,
  },
  {
    id: '65801ee66ee8784aaea8c3a9',
    img: 'http://placehold.it/32x32',
    name: 'Stevenson Erickson',
    email: 'stevensonerickson@zentix.com',
    location: '826 Jerome Avenue, Curtice, South Carolina, 7377',
    dob: '2023-01-04T04:56:31',
    role: UserRole.User,
  },
  {
    id: '65801ee644553f5d77769d1c',
    img: 'http://placehold.it/32x32',
    name: 'Yolanda Spears',
    email: 'yolandaspears@zentix.com',
    location: '703 Vandervoort Avenue, Denio, Connecticut, 9030',
    dob: '2014-01-20T09:08:34',
    role: UserRole.Worker,
  },
  {
    id: '65801ee659af5afa83c55fbc',
    img: 'http://placehold.it/32x32',
    name: 'Tonya Shaffer',
    email: 'tonyashaffer@zentix.com',
    location: '784 Fillmore Avenue, Orick, North Dakota, 5416',
    dob: '2021-02-09T06:02:33',
    role: UserRole.Worker,
  },
  {
    id: '65801ee6abf26a8d44507060',
    img: 'http://placehold.it/32x32',
    name: 'Nadine Fisher',
    email: 'nadinefisher@zentix.com',
    location: '373 Dank Court, Hondah, Florida, 3070',
    dob: '2016-07-18T04:22:30',
    role: UserRole.Worker,
  },
  {
    id: '65801ee63982e5a0abf8dde7',
    img: 'http://placehold.it/32x32',
    name: 'Eula Vargas',
    email: 'eulavargas@zentix.com',
    location: '572 Boerum Place, Sanborn, Ohio, 6834',
    dob: '2017-10-26T01:49:01',
    role: UserRole.Worker,
  },
  {
    id: '65801ee61462bfe07a855d85',
    img: 'http://placehold.it/32x32',
    name: 'Garner Taylor',
    email: 'garnertaylor@zentix.com',
    location: '198 Micieli Place, Klondike, California, 7496',
    dob: '2022-09-03T08:43:42',
    role: UserRole.Worker,
  },
  {
    id: '65801ee6c8c8d77971f67cda',
    img: 'http://placehold.it/32x32',
    name: 'Daniel Mcneil',
    email: 'danielmcneil@zentix.com',
    location: '687 Doscher Street, Townsend, Arizona, 5668',
    dob: '2014-02-06T02:54:32',
    role: UserRole.Worker,
  },
  {
    id: '65801ee6a19af9fdabaedd55',
    img: 'http://placehold.it/32x32',
    name: 'Hoover Alvarez',
    email: 'hooveralvarez@zentix.com',
    location: '727 Jamaica Avenue, Duryea, Oregon, 7745',
    dob: '2019-06-20T02:57:08',
    role: UserRole.Worker,
  },
  {
    id: '65801ee67ef06a9b2978e15f',
    img: 'http://placehold.it/32x32',
    name: 'Delgado Peck',
    email: 'delgadopeck@zentix.com',
    location:
      '658 Cheever Place, Chilton, Federated States Of Micronesia, 7421',
    dob: '2020-08-28T10:28:55',
    role: UserRole.Worker,
  },
];

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

  constructor(private pipe: DecimalPipe) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
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
    let users = sort(USERS, sortColumn, sortDirection);

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
}
