import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, firstValueFrom, map, of } from 'rxjs';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { PROGRAMS_API } from 'src/common/constants/endpoints';
import { HttpClient } from '@angular/common/http';
import { HeadersService } from 'src/common/services/headers.service';
import { API_Response } from 'src/common/interfaces/response.interface';

@Injectable({ providedIn: 'root' })
export class ProgramService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _programs$ = new BehaviorSubject<TrainingProgram[]>([]);

  constructor(
    private http: HttpClient,
    private headersService: HeadersService
  ) {
    this.getPrograms();
  }

  async getPrograms() {
    return await firstValueFrom(
      this.http
        .get<API_Response>(`${PROGRAMS_API}`, {
          headers: this.headersService.getHeaders,
          withCredentials: true,
        })
        .pipe(
          map((response: API_Response) => {
            this._programs$.next(response.data);

            return {
              status: response.status,
              message: response.message,
              data: response.data,
            };
          })
        )
    );
  }

  async getProgramById(programId: string) {
    return await firstValueFrom(
      this.http
        .get<API_Response>(`${PROGRAMS_API}/${programId}`, {
          headers: this.headersService.getHeaders,
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

  get programs() {
    return this._programs$.asObservable();
  }
}
