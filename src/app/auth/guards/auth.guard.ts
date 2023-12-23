import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { catchError, delay, from, map, of, switchMap, tap } from 'rxjs';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getIsAuthenticated.pipe(
    switchMap((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        return of(true);
      } else {
        return from(authService.checkTokenValidity()).pipe(
          map((isValid: boolean) => {
            if (isValid) {
              return true;
            } else {
              router.navigate(['/auth/login']);
              return false;
            }
          }),
          catchError((error) => {
            router.navigate(['/auth/login']);
            return of(false);
          })
        );
      }
    })
  );
};
