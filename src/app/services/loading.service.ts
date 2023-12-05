// loading-spinner.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  get loading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  show(): void {
    this.loadingSubject.next(true);
  }

  hide(): void {
    console.log('Hiding spinner.');
    this.loadingSubject.next(false);
  }
}
