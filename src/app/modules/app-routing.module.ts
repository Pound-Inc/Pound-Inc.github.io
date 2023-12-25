import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  provideRouter,
  withHashLocation,
} from '@angular/router';
import { LandingComponent } from '../pages/landing/landing.component';
import { coachResolver } from '../resolvers/coach.resolver';
import { TrainingProgramComponent } from '../pages/training-program/training-program.component';
import { CoachComponent } from '../pages/coach/coach.component';
import { MaleComponent } from '../pages/male/male.component';
import { FemaleComponent } from '../pages/female/female.component';
import { ArticleComponent } from '../pages/article/article.component';
import { StoryComponent } from '../pages/story/story.component';
import { ProgramsComponent } from '../pages/programs/programs.component';
import { CoachesComponent } from '../pages/coaches/coaches.component';
import { profileGuard } from '../guards/profile.guard';
import { programGuard } from '../guards/program.guard';
import { programResolver } from '../resolvers/program.resolver';
import { receiptResolver } from '../resolvers/receipt.resolver';

const routes: Routes = [
  {
    path: 'program/:programId',
    component: TrainingProgramComponent,
    canActivate: [programGuard],
    resolve: {
      program: programResolver,
      receipts: receiptResolver,
    },
  },
  { path: 'male', component: MaleComponent },
  { path: 'female', component: FemaleComponent },
  { path: 'article/:articleId', component: ArticleComponent },
  { path: 'story', component: StoryComponent },
  { path: 'programs', component: ProgramsComponent },
  { path: 'coaches', component: CoachesComponent },
  {
    path: 'coach/:coachId',
    component: CoachComponent,
    canActivate: [profileGuard],
    resolve: { coach: coachResolver },
  },
  { path: '', component: LandingComponent, title: 'Pound Inc.' },
  // { path: '**', redirectTo: '',  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withHashLocation())],
})
export class AppRoutingModule {}
