import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  provideRouter,
  withHashLocation,
} from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { onBoardingGuard } from '../guards/onboarding.guard';
import { onBoardingDeactivateGuard } from '../guards/onboarding.da.guard';
import { RegisterOkComponent } from '../pages/register-ok/register-ok.component';
import { RegisterErrorComponent } from '../pages/register-error/register-error.component';

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
      {
        path: 'register-ok',
        component: RegisterOkComponent,
        canActivate: [onBoardingGuard],
        canDeactivate: [onBoardingDeactivateGuard],
      },
      {
        path: 'register-error',
        component: RegisterErrorComponent,
        canActivate: [onBoardingGuard],
        canDeactivate: [onBoardingDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withHashLocation())],
})
export class AuthRoutingModule {}
