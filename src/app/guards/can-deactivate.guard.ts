import { Observable } from 'rxjs';
import {
  CanDeactivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { ManageCrisesComponent } from '../admin/manage-crises/manage-crises.component';

export const canDeactivateGuard: CanDeactivateFn<ManageCrisesComponent> = (
  component: ManageCrisesComponent,
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | boolean => {
  // Get the Crisis Center ID
  console.log(route.paramMap.get('id'));

  // Get the current URL
  console.log(state.url);

  // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
  if (!component.crisis || component.crisis.name === component.editName) {
    return true;
  }
  // Otherwise ask the user with the dialog service and return its
  // observable which resolves to true or false when the user decides
  //* return component.dialogService.confirm('Discard changes?');
  return false;
};
