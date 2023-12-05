import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LandingComponent } from './landing/landing.component';
import { userResolver } from './users/user-resolver.resolver';

const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'profile/:username',
    component: ProfileComponent,
    resolve: {
      user: userResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
