import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';

export const usersResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot
) => {
  const router = inject(Router);
  const us = inject(UsersService);

  const users = us.getUsers();
  if (users) {
    return of(true);
  }
  return EMPTY;
};
