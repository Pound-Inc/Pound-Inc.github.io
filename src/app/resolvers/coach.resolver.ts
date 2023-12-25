import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { UserService } from '../admin/services/user.service';

export const coachResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot
) => {
  const userService = inject(UserService);
  const coachId = route.params['coachId'];

  const user = await userService.getUserById(coachId);
  return user;
};
