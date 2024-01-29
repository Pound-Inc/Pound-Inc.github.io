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

@Injectable({ providedIn: 'root' })
export class PlanService {
  private readonly plans = new BehaviorSubject<ProgramPlan[]>([]);
  public plans$ = this.plans.asObservable();
  private programRowData = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  getPlans() {
    return new Promise<ProgramPlan[]>((resolve, reject) => {
      return this.http
        .get<API_Response>(`${PLANS_API}/plans`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: API_Response) => {
            this.plans.next(response.data);
            return resolve(response.data);
          },
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }

  getRelatedPlans(programId: string) {
    return new Promise<ProgramPlan[]>((resolve, reject) => {
      return this.http
        .get<API_Response>(`${PLANS_API}/plans/${programId}/`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: API_Response) => {
            this.plans.next(response.data);
            return resolve(response.data);
          },
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }

  createNewPlan(plan: any) {
    return new Promise<ProgramPlan>((resolve, reject) => {
      return this.http
        .post<any>(`${PLANS_API}/plans`, plan, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: any) => {
            return resolve(response);
          },
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }

  deletePlanByProgramId(programId: any) {
    return new Promise<ProgramPlan>((resolve, reject) => {
      return this.http
        .delete<any>(`${PLANS_API}/plans/${programId}`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: any) => {
            return resolve(response);
          },
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }
  modifyPlan(plan: any) {
    return new Promise<ProgramPlan>((resolve, reject) => {
      return this.http
        .put<any>(`${PLANS_API}/plans/${plan._id}`, plan, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: any) => {
            return resolve(response);
          },
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }

  setSelectedProgramData(data: any) {
    this.programRowData.next(data);
  }
  getSelectedProgramData(): Observable<TrainingProgram> {
    return this.programRowData.asObservable();
  }
}
