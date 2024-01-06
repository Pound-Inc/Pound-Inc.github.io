import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { catchError, delay, from, map, of, switchMap, tap } from 'rxjs';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService
    .getProfile()
    .then((user) => {
      if (user) {
        return true;
      }

      router.navigate(['/']);
      return false;
    })
    .catch(() => {
      router.navigate(['/']);
      return false;
    });
};
