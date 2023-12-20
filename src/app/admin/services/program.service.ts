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
import { TrainingProgram } from 'src/app/model/training-program.model';
import { SortColumn, SortDirection } from '../sortable.directive';
import { Table } from 'src/common/interfaces/table.interface';

interface SearchResult {
  programs: TrainingProgram[];
  total: number;
}
export const PROGRAMS: TrainingProgram[] = [
  {
    id: 'PR20001',
    name: 'برنامج اللياقة البدنية',
    description: 'برنامج مركز على تحسين اللياقة العامة والرفاهية.',
    phases: { muscle: 80, cut: 10, bulk: 40 },
    coach_id: 'U10001c',
    img: 'https://picsum.photos/1920/1080?random=21',
  },
  {
    id: 'PR20002',
    name: 'معسكر اليوغا',
    description: 'استمتع بالاسترخاء والتأمل من خلال معسكر اليوغا.',
    phases: { muscle: 10, cut: 50, bulk: 70 },
    coach_id: 'U10001c',
    img: 'https://picsum.photos/1920/1080?random=2',
  },
  {
    id: 'PR20003',
    name: 'دورة تعلم البرمجة',
    description:
      'برنامج برمجة مكثف للمبتدئين والمطورين المتقدمين. برنامج برمجة مكثف للمبتدئين والمطورين المتقدمين. برنامج برمجة مكثف للمبتدئين والمطورين المتقدمين.',
    phases: { muscle: 80, cut: 80, bulk: 40 },
    coach_id: 'U10001c',
    img: 'https://picsum.photos/1920/1080?random=5',
  },
  {
    id: 'PR20004',
    name: 'تعلم اللغات',
    description: 'احترف لغة جديدة من خلال برنامج هيكلي لتعلم اللغات.',
    phases: { muscle: 80, cut: 10, bulk: 40 },
    coach_id: 'U100085',
    img: 'https://picsum.photos/1920/1080?random=4',
  },
  {
    id: 'PR20005',
    name: 'ورشة الفن',
    description: 'استكشف جانبك الفني في ورشة عمل إبداعية وتعاونية.',
    phases: { muscle: 80, cut: 10, bulk: 10 },
    coach_id: 'U100085',
    img: 'https://picsum.photos/1920/1080?random=6',
  },
];

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
        this._programs$.next(result.programs);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get programs() {
    return this._programs$.asObservable();
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
    let programs = sort(PROGRAMS, sortColumn, sortDirection);

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
