import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PROGRAMS_API } from 'src/common/constants/endpoints';
import { API_Response } from 'src/common/interfaces/response.interface';

@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(private http: HttpClient) {}

  async getRelatedComments(programId: string) {
    return new Promise<any>((resolve, reject) => {
      return this.http
        .get<any>(`${PROGRAMS_API}/comments/${programId}`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response: any) => {
            if (response) {
              return resolve(response.data);
            }
          },
          error: (error) => {
            return reject(error.errorMessage);
          },
        });
    });
  }
}
