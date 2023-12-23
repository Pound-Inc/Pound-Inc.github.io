import { Observable } from 'rxjs';
import {
  CanDeactivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { RegisterComponent } from '../pages/register/register.component';
import { inject } from '@angular/core';

export const onBoardingDeactivateGuard: CanDeactivateFn<RegisterComponent> = (
  component: RegisterComponent,
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | boolean => {
  const router = inject(Router);

  // Get the current URL
  console.log(state.url);
  return true;

  // return component.canDeactivate();
};
