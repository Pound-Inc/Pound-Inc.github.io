import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class HeadersService {
  private headers: HttpHeaders;
  constructor(private cookieService: CookieService) {
    this.setHeaders();
  }

  private setHeaders() {
    const token = this.cookieService.get('AUTH');
    if (token) {
      this.headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    }
  }
  get getHeaders() {
    return this.headers;
  }
}
