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
import { Gender, User, UserRole } from 'src/app/model/user.model';
import { Coach } from 'src/app/model/coach.model';

interface SearchResult {
  users: User[];
  total: number;
}
export const USERS: User[] | Coach[] = [
  {
    id: 'U100018',
    img: 'https://picsum.photos/200?random=1',
    name: 'Ochoa Hancock',
    email: 'ochoahancock@zentix.com',
    gender: Gender.Female,
    location: {
      country: 'USA',
      city: 'Murillo',
      postal_code: '158 44',
      street: '774 Sullivan Street',
    },
    dob: '2020-05-07',
    role: UserRole.Admin,
  },
  {
    id: 'U1000a9',
    img: 'https://picsum.photos/200?random=2',
    name: 'Stevenson Erickson',
    email: 'stevensonerickson@zentix.com',
    gender: Gender.Female,
    location: {
      country: 'USA',
      city: 'Murillo',
      postal_code: '158 44',
      street: '774 Sullivan Street',
    },
    dob: '2023-01-04',
    role: UserRole.User,
  },
  {
    id: 'U10001c',
    img: 'https://picsum.photos/200?random=3',
    name: 'أحمد محسن',
    email: 'yolandaspears@zentix.com',
    gender: Gender.Male,
    location: {
      country: 'us',
      city: 'Murillo',
      postal_code: '158 44',
      street: '774 Sullivan Street',
    },
    dob: '2014-01-20',
    role: UserRole.Worker,
    availability: 'busy',
    certification_id: '4433EER',
    certified_by_id: 'U100018',
    description:
      'مدرب لياقة بدنية معتمد وبطل دولي في الكيوكوشن كاراتيه. أقدم خدمات التدريب الشخصي والتطوير الذاتي بأعلى جودة!',
    is_verified: true,
    languages: ['se', 'gb', 'sa'],
    ratings: ['', '', ''],
    tags: [
      { name: 'سريع', color: 'danger', icon: 'email-fast' },
      { name: 'محترف', color: 'primary', icon: 'star' },
      { name: '', color: 'dark', icon: 'human-male' },
    ],
    stars: 4,
  },
  {
    id: 'U1000bc',
    img: 'https://picsum.photos/200?random=4',
    name: 'Tonya Shaffer',
    email: 'tonyashaffer@zentix.com',
    gender: Gender.Female,
    location: {
      country: 'USA',
      city: 'Murillo',
      postal_code: '158 44',
      street: '774 Sullivan Street',
    },
    dob: '2021-02-09',
    role: UserRole.Worker,
  },
  {
    id: 'U100060',
    img: 'https://picsum.photos/200?random=5',
    name: 'Nadine Fisher',
    email: 'nadinefisher@zentix.com',
    gender: Gender.Female,
    location: {
      country: 'USA',
      city: 'Murillo',
      postal_code: '158 44',
      street: '774 Sullivan Street',
    },
    dob: '2016-07-18',
    role: UserRole.Worker,
  },
  {
    id: 'U1000e7',
    img: 'https://picsum.photos/200?random=6',
    name: 'Eula Vargas',
    email: 'eulavargas@zentix.com',
    gender: Gender.Female,
    location: {
      country: 'USA',
      city: 'Murillo',
      postal_code: '158 44',
      street: '774 Sullivan Street',
    },
    dob: '2017-10-26',
    role: UserRole.Worker,
  },
  {
    id: 'U100085',
    img: 'https://picsum.photos/200?random=7',
    name: 'Garner Taylor',
    email: 'garnertaylor@zentix.com',
    gender: Gender.Female,
    location: {
      country: 'USA',
      city: 'Murillo',
      postal_code: '158 44',
      street: '774 Sullivan Street',
    },
    dob: '2022-09-03',
    role: UserRole.Worker,
  },
  {
    id: 'U1000da',
    img: 'https://picsum.photos/200?random=8',
    name: 'Daniel Mcneil',
    email: 'danielmcneil@zentix.com',
    gender: Gender.Female,
    location: {
      country: 'USA',
      city: 'Murillo',
      postal_code: '158 44',
      street: '774 Sullivan Street',
    },
    dob: '2014-02-06',
    role: UserRole.User,
  },
  {
    id: 'U100055',
    img: 'https://picsum.photos/200?random=9',
    name: 'Hoover Alvarez',
    email: 'hooveralvarez@zentix.com',
    gender: Gender.Female,
    location: {
      country: 'USA',
      city: 'Murillo',
      postal_code: '158 44',
      street: '774 Sullivan Street',
    },
    dob: '2019-06-20',
    role: UserRole.Worker,
  },
  {
    id: 'U10005f',
    img: 'https://picsum.photos/200?random=14',
    name: 'Delgado Peck',
    email: 'delgadopeck@zentix.com',
    gender: Gender.Female,
    location: {
      country: 'USA',
      city: 'Murillo',
      postal_code: '158 44',
      street: '774 Sullivan Street',
    },
    dob: '2020-08-28',
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
