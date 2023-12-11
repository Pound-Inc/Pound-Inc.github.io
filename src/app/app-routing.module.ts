import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { coachResolver } from './resolvers/coach.resolver';
import { TrainingProgramComponent } from './training-program/training-program.component';
import { CoachComponent } from './coach/coach.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'program', component: TrainingProgramComponent },
  {
    path: 'coach/:coachId',
    component: CoachComponent,
    resolve: {
      coach: coachResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
