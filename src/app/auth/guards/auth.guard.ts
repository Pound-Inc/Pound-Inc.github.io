import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService
    .getProfile()
    .then((user) => {
      if (user) {
        return true;
      }
      router.navigate(['auth/login']);
      return false;
    })
    .catch(() => {
      router.navigate(['auth/login']);
      return false;
    });
};
