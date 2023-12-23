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
  EMPTY,
  firstValueFrom,
  map,
} from 'rxjs';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { SortColumn, SortDirection } from '../sortable.directive';
import { Table } from 'src/common/interfaces/table.interface';
import { AUTH_API, PROGRAMS_API } from 'src/common/constants/endpoints';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HeadersService } from 'src/common/services/headers.service';
import { API_Response } from 'src/common/interfaces/response.interface';

interface SearchResult {
  programs: TrainingProgram[];
  total: number;
}

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(
  programs: TrainingProgram[],
  column: SortColumn,
  direction: string
): TrainingProgram[] {
  if (direction === '' || column === 'name' || column === 'id') {
    return programs;
  } else {
    return [...programs].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(program: TrainingProgram, term: string) {
  return program.name.toLowerCase().includes(term.toLowerCase());
}

@Injectable({ providedIn: 'root' })
export class ProgramService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _programs$ = new BehaviorSubject<TrainingProgram[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  public _state: Table = {
    page: 1,
    pageSize: 100,
    searchTerm: '',
    sortColumn: 'name',
    sortDirection: '',
  };

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private headersService: HeadersService
  ) {
    this.getPrograms().then((response: any) => {
      this._programs$.next(response.data);
    });
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        switchMap(() => this._search()),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._programs$.next(result.programs);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  async getPrograms() {
    try {
      const response = await firstValueFrom(
        this.http
          .get<API_Response>(`${PROGRAMS_API}`, {
            headers: this.headersService.getHeaders,
            withCredentials: true,
          })
          .pipe(
            map((response: API_Response) => {
              console.log(response);

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

  get programs() {
    return this._programs$.asObservable();
  }

  getProgramById(programId: string): Observable<TrainingProgram> {
    const program = this._programs$
      .getValue()
      .find((program) => program._id === programId);
    if (program) {
      return of(program);
    }
    return EMPTY;
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

  private _set(patch: Partial<Table>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      this._state;

    // 1. sort
    let programs = sort(this._programs$.getValue(), sortColumn, sortDirection);

    // 2. filter
    programs = programs.filter((program) => matches(program, searchTerm));
    const total = programs.length;

    // 3. paginate
    programs = programs.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({ programs: programs, total });
  }
}
