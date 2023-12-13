import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

export const onBoardingGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn) {
    return true;
  }

  // Redirect to the landing page
  return router.parseUrl('');
};
