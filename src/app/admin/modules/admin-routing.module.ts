import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../auth/guards/auth.guard';
import { AdminLandingComponent } from '../pages/admin-landing/admin-landing.component';
import { userResolver } from '../resolvers/user.resolver';

const adminRoutes: Routes = [
  {
    path: 'dashboard',
    canActivate: [authGuard],
    resolve: { user: userResolver },
    children: [
      {
        path: '',
        component: AdminLandingComponent,
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
