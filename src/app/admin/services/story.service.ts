import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  Observable,
  firstValueFrom,
  map,
} from 'rxjs';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { HttpClient } from '@angular/common/http';
import { PLANS_API } from 'src/common/constants/endpoints';
import { API_Response } from 'src/common/interfaces/response.interface';
import { HeadersService } from 'src/common/services/headers.service';
import { ProgramStory } from 'src/app/model/story.model';

@Injectable({ providedIn: 'root' })
export class StoryService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _stories$ = new BehaviorSubject<ProgramStory[]>([]);
  // Related Program:
  private programRowData = new BehaviorSubject<any>(null);

  constructor(
    private headersService: HeadersService,
    private http: HttpClient
  ) {}

  get stories() {
    return this._stories$.asObservable();
  }

  async getRelatedStories(programId: string) {
    return await firstValueFrom(
      this.http
        .get<API_Response>(`${PLANS_API}/stories/${programId}`, {
          headers: this.headersService.getHeaders,
          withCredentials: true,
        })
        .pipe(
          map((response: API_Response) => {
            this._stories$ = response.data;
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
}
