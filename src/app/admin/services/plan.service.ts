import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  Observable,
  firstValueFrom,
  map,
  of,
  catchError,
} from 'rxjs';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { HttpClient } from '@angular/common/http';
import { PLANS_API } from 'src/common/constants/endpoints';
import { API_Response } from 'src/common/interfaces/response.interface';
import { HeadersService } from 'src/common/services/headers.service';

@Injectable({ providedIn: 'root' })
export class PlanService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _plans$ = new BehaviorSubject<ProgramPlan[]>([]);
  // Related Program:
  private programRowData = new BehaviorSubject<any>(null);

  constructor(
    private headersService: HeadersService,
    private http: HttpClient
  ) {}

  get plans() {
    return this._plans$.asObservable();
  }

  async getPlans() {
    return await firstValueFrom(
      this.http
        .get<API_Response>(`${PLANS_API}/plans`, {
          headers: this.headersService.getHeaders,
          withCredentials: true,
        })
        .pipe(
          map((response: API_Response) => {
            this._plans$ = response.data;
            return {
              status: response.status,
              message: response.message,
              data: response.data,
            };
          })
        )
    );
  }

  async getRelatedPlans(programId: string) {
    return await firstValueFrom(
      this.http
        .get<API_Response>(`${PLANS_API}/plans/${programId}`, {
          headers: this.headersService.getHeaders,
          withCredentials: true,
        })
        .pipe(
          map((response: API_Response) => {
            this._plans$ = response.data;
            return {
              status: response.status,
              message: response.message,
              data: response.data,
            };
          })
        )
    );
  }

  setSelectedProgramData(data: any) {
    this.programRowData.next(data);
  }
  getSelectedProgramData(): Observable<TrainingProgram> {
    return this.programRowData.asObservable();
  }

  async createNewPlan(plan: any) {
    return await firstValueFrom(
      this.http
        .post<any>(`${PLANS_API}/plans`, plan, {
          withCredentials: true,
        })
        .pipe(
          map((response: any) => {
            return response;
          }),
          catchError((error) => of(error))
        )
    );
  }
  async modifyPlan(plan: any) {
    return await firstValueFrom(
      this.http
        .put<any>(`${PLANS_API}/plans/${plan._id}`, plan, {
          withCredentials: true,
        })
        .pipe(
          map((response: any) => {
            return response;
          }),
          catchError((error) => of(error))
        )
    );
  }
}
