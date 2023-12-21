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
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { Table } from 'src/common/interfaces/table.interface';

interface SearchResult {
  plans: ProgramPlan[];
  total: number;
}
export const PLANS: ProgramPlan[] = [
  {
    id: 'PP30001',
    name: 'Basic Fitness Plan',
    program_id: 'PR20003',
    description: 'A starter plan for improving overall fitness.',
    price: 29.99,
    delivery_days: 1,
  },
  {
    id: 'PP30002',
    name: 'Premium Yoga Plan',
    program_id: 'PR20003',
    description: 'An exclusive yoga plan with advanced sessions.',
    price: 39.99,
    delivery_days: 3,
  },
  {
    id: 'PP30003',
    name: 'Coding Pro Plan',
    program_id: 'PR20003',
    description: 'Comprehensive coding plan with mentor support.',
    price: 49.99,
    delivery_days: 1,
  },
  {
    id: 'PP30004',
    name: 'Language Mastery Plan',
    program_id: 'PR20002',
    description: 'Intensive language learning plan with personalized lessons.',
    price: 34.99,
    delivery_days: 1,
  },
  {
    id: 'PP30005',
    name: 'Art Enthusiast Plan',
    program_id: 'PR20002',
    description: 'Unlock your artistic potential with this creative plan.',
    price: 24.99,
    delivery_days: 1,
  },
  {
    id: 'PP30006',
    name: 'Art Enthusiast Plan',
    program_id: 'PR20002',
    description: 'Unlock your artistic potential with this creative plan.',
    price: 24.99,
    delivery_days: 1,
  },
  {
    id: 'PP30007',
    name: 'Language Mastery Plan',
    program_id: 'PR20004',
    description: 'Intensive language learning plan with personalized lessons.',
    price: 34.99,
    delivery_days: 1,
  },
  {
    id: 'PP30008',
    name: 'Art Enthusiast Plan',
    program_id: 'PR20004',
    description: 'Unlock your artistic potential with this creative plan.',
    price: 24.99,
    delivery_days: 1,
  },
  {
    id: 'PP30009',
    name: 'Art Enthusiast Plan',
    program_id: 'PR20004',
    description: 'Unlock your artistic potential with this creative plan.',
    price: 24.99,
    delivery_days: 1,
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

function sort(
  plans: ProgramPlan[],
  column: SortColumn,
  direction: string
): ProgramPlan[] {
  if (direction === '' || column === 'name' || column === 'id') {
    return plans;
  } else {
    return [...plans].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(program: ProgramPlan, term: string) {
  return program.name.toLowerCase().includes(term.toLowerCase());
}

@Injectable({ providedIn: 'root' })
export class PlanService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _plans$ = new BehaviorSubject<ProgramPlan[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  // Related Program:
  private programRowData = new BehaviorSubject<any>(null);

  public _state: Table = {
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
        this._plans$.next(result.plans);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get plans() {
    return this._plans$.asObservable();
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
    let plans = sort(PLANS, sortColumn, sortDirection);

    // 2. filter
    plans = plans.filter((program) => matches(program, searchTerm));
    const total = plans.length;

    // 3. paginate
    plans = plans.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({ plans: plans, total });
  }

  setSelectedProgramData(data: any) {
    this.programRowData.next(data);
  }
  getSelectedProgramData(): Observable<TrainingProgram> {
    return this.programRowData.asObservable();
  }
}
