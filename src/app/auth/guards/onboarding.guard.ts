import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { switchMap, of, from, map, catchError } from 'rxjs';

export const onBoardingGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getIsAuthenticated.pipe(
    switchMap((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        router.navigate(['/']);
        return of(false);
      } else {
        return from(authService.checkTokenValidity()).pipe(
          map((isValid: boolean) => {
            if (isValid) {
              router.navigate(['/']);
              return of(false);
            }
            return of(true);
          }),
          catchError((error) => {
            return of(true);
          })
        );
      }
    })
  );
};
