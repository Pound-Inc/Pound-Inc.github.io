import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn) {
    return authService
      .getProfile()
      .then((user) => {
        if (user) return true;

        router.navigate(['/auth/login']);
        return false;
      })
      .catch(() => {
        router.navigate(['/auth/login']);
        return false;
      });
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
