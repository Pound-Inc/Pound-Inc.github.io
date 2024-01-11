import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const onBoardingGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService
    .getProfile()
    .then((user) => {
      if (!user) {
        return true;
      }
      router.navigate(['/']);
      return false;
    })
    .catch(() => {
      return true;
    });
};
