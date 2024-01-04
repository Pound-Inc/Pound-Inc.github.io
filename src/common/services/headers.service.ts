import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class HeadersService {
  private headers: HttpHeaders;
  constructor(private cookieService: CookieService) {
    this.setHeaders();
  }

  setHeaders() {
    const token = this.cookieService.get('authorization');
    const tokenLocalStorage = localStorage.getItem('authorization');
    if (token || tokenLocalStorage) {
      this.headers = new HttpHeaders({
        Authorization: `Bearer ${tokenLocalStorage}`,
      });
    }
  }
  get getHeaders() {
    return this.headers;
  }
}
