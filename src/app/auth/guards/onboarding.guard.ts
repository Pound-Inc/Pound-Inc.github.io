import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { switchMap, of, from, map, catchError } from 'rxjs';

export const onBoardingGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // return authService.getProfile().pipe(
  //   map((user) => {
  //     console.log(user);
  //     if (user) return false;
  //     return true;
  //   }),
  //   catchError((error) => {
  //     console.log(error);
  //     return of(true);
  //   })
  // );
};
