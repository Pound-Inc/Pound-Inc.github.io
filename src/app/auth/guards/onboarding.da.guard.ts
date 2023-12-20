import { Observable } from 'rxjs';
import {
  CanDeactivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { RegisterComponent } from '../pages/register/register.component';

export const onBoardingDeactivateGuard: CanDeactivateFn<RegisterComponent> = (
  component: RegisterComponent,
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | boolean => {
  // Get the current URL
  console.log(state.url);
  return true;

  // return component.canDeactivate();
};
