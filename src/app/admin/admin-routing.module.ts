import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ManageCrisesComponent } from './manage-crises/manage-crises.component';
import { ManageHeroesComponent } from './manage-heroes/manage-heroes.component';
import { authGuard } from '../auth/auth.guard';
import { canDeactivateGuard } from '../guards/can-deactivate.guard';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],

    children: [
      {
        path: '',
        canActivateChild: [authGuard],
        children: [
          {
            path: 'crises',
            component: ManageCrisesComponent,
            canDeactivate: [canDeactivateGuard]
            // canDeactivate: [], //TODO: On Unsaved changes, you can delay until saved, or confirm leaving...
          },
          { path: 'heroes', component: ManageHeroesComponent },
          { path: '', component: AdminDashboardComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
