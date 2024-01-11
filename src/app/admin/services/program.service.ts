import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  firstValueFrom,
  map,
  of,
} from 'rxjs';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { PROGRAMS_API } from 'src/common/constants/endpoints';
import { HttpClient } from '@angular/common/http';
import { API_Response } from 'src/common/interfaces/response.interface';

@Injectable({ providedIn: 'root' })
export class ProgramService {
  private readonly programs = new BehaviorSubject<TrainingProgram[]>([]);
  public programs$ = this.programs.asObservable();

  constructor(private http: HttpClient) {}

  getPrograms(): Promise<TrainingProgram[]> {
    return new Promise<TrainingProgram[]>((resolve, reject) => {
      return this.http
        .get<API_Response>(`${PROGRAMS_API}/`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: any) => {
            if (response) {
              this.programs.next(response.data);
              return resolve(response.data);
            }
          },
          error: (error) => {
            return reject(error.errorMessage);
          },
        });
    });
  }

  getProgramById(programId: string) {
    return new Promise<TrainingProgram>((resolve, reject) => {
      return this.http
        .get<TrainingProgram>(`${PROGRAMS_API}/program/${programId}/`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: TrainingProgram) => {
            resolve(response);
          },
          error: (error) => {
            return reject(error.error.message);
          },
        });
    });
  }

  createNewProgram(request: any): Observable<any> {
    return this.http.post<any>(`${PROGRAMS_API}`, request, {
      withCredentials: true,
    });
  }
}
