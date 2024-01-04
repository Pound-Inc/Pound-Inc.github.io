import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { catchError, map } from 'rxjs';

export const userResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot
) => {
  const userService = inject(UserService);
  const authService = inject(AuthService);
  return authService.currentUser.getValue();
};
