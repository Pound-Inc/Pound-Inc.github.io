import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from '../pages/admin-dashboard/admin-dashboard.component';
import { authGuard } from '../../auth/guards/auth.guard';

const adminRoutes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
        canActivate: [authGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
