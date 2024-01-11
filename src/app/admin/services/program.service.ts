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
  private _programs$ = new BehaviorSubject<TrainingProgram[]>([]);

  constructor(private http: HttpClient) {
    this.getPrograms();
  }

  getPrograms(): Promise<TrainingProgram[]> {
    return new Promise<TrainingProgram[]>((resolve, reject) => {
      return this.http
        .get<API_Response>(`${PROGRAMS_API}/`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: any) => {
            if (response) {
              this._programs$.next(response.data);
              return resolve(response.data);
            }
          },
          error: (error) => {
            return reject(error.errorMessage);
          },
        });
    });
  }

  async getProgramById(programId: string) {
    return await firstValueFrom(
      this.http
        .get<API_Response>(`${PROGRAMS_API}/program/${programId}/`, {
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

  createNewProgram(request: any): Observable<any> {
    return this.http.post<any>(`${PROGRAMS_API}`, request, {
      withCredentials: true,
    });
  }

  get programs() {
    return this._programs$.asObservable();
  }
}
