import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { UserService } from '../admin/services/user.service';

export const profileGuard = async (route: ActivatedRouteSnapshot) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const coachId = route.params['coachId'];

  const user = await userService.getUserById(coachId);
  console.log(user);
  
  if (user) {
    return true;
  }
  router.navigate(['/'])
  return false;
};
