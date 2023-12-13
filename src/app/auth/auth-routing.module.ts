import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { onBoardingGuard } from './onboarding.guard';
import { canDeactivateGuard } from '../guards/can-deactivate.guard';
import { onBoardingDeactivateGuard } from './onboarding.da.guard';
import { RegisterFinalComponent } from './register-final/register-final.component';

const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [onBoardingGuard],
    canDeactivate: [onBoardingDeactivateGuard],
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    canActivate: [onBoardingGuard],
    canDeactivate: [onBoardingDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
