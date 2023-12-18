import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CoachService } from '../services/coach.service';
import { Coach } from '../model/coach.model';

export const coachResolver: ResolveFn<Coach> = (
  route: ActivatedRouteSnapshot
) => {
  const router = inject(Router);
  const cs = inject(CoachService);
  const id = route.paramMap.get('coachId')!;

  return cs.getCoachById(id).pipe(
    mergeMap((user) => {
      if (user) {
        return of(user);
      } else {
        // id not found
        router.navigate(['']);
        return EMPTY;
      }
    })
  );
};
