import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map } from 'rxjs';
import { IMGBB_API } from 'src/common/constants/endpoints';

@Injectable({ providedIn: 'root' })
export class ImgbbService {
  private readonly apiKey: string = '245359a43dafe415469201f93da0b3b9';
  constructor(private readonly httpClient: HttpClient) {}

  public async upload(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    // return this.httpClient
    //   .post('/upload', formData, {
    //     params: { key: this.apiKey },
    //   })
    //   .pipe(map((response: any) => response['data']['url']));

    return await firstValueFrom(
      this.httpClient
        .post<any>(`${IMGBB_API}`, formData, { params: { key: this.apiKey } })
        .pipe(
          map((response: any) => {
            return response['data']['url'];
          })
        )
    );
  }
}
