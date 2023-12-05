import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  public getUsers() {
    return [{ name: '' }];
  }

  public getUser(id: string): Observable<any> {
    const user = { name: 'Default User' };
    return of(user).pipe(delay(2000));
  }
}
