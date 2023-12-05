import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';

export const userResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const us = inject(UsersService);
  const id = route.paramMap.get('id')!;

  return us.getUser(id).pipe(
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
