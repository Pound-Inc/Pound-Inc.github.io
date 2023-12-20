import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { onBoardingGuard } from '../guards/onboarding.guard';
import { onBoardingDeactivateGuard } from '../guards/onboarding.da.guard';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [onBoardingGuard],
        canDeactivate: [onBoardingDeactivateGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [onBoardingGuard],
        canDeactivate: [onBoardingDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
