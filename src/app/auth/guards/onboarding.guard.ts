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
        console.log(isAuthenticated);
        
        return of(false);
      } else {
        return from(authService.checkTokenValidity()).pipe(
          map((isValid: boolean) => {
            return isValid ? false : true;
          }),
          catchError((error) => {
            return of(true);
          })
        );
      }
    })
  );
};
