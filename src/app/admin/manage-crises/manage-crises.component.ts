import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-crises',
  templateUrl: './manage-crises.component.html',
  styleUrls: ['./manage-crises.component.scss'],
})
export class ManageCrisesComponent {
  crisis: { name: string };
  editName: string;

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    //* return this.dialogService.confirm('Discard changes?');
    return false;
  }
}
