import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { programsResolver } from '../resolvers/programs.resolver';
import { CartComponent } from '../pages/cart/cart.component';
import { NutritionComponent } from '../auth/pages/nutrition/nutrition.component';
import { CardioComponent } from '../auth/pages/cardio/cardio.component';
import { PowerComponent } from '../auth/pages/power/power.component';
import { nutritionResolver } from '../resolvers/nutrition.resolver';
import { powerResolver } from '../resolvers/power.resolver';
import { cardioResolver } from '../resolvers/cardio.resolver';

const routes: Routes = [
  {
    path: 'program/:programId',
    component: TrainingProgramComponent,
    canActivate: [programGuard],
    resolve: {
      program: programResolver,
    },
  },
  { path: 'male', component: MaleComponent },
  { path: 'female', component: FemaleComponent },
  { path: 'article/:articleId', component: ArticleComponent },
  { path: 'story', component: StoryComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'power',
    component: PowerComponent,
    resolve: {
      programs: powerResolver,
    },
  },
  {
    path: 'cardio',
    component: CardioComponent,
    resolve: {
      programs: cardioResolver,
    },
  },
  {
    path: 'nutrition',
    component: NutritionComponent,
    resolve: {
      programs: nutritionResolver,
    },
  },
  {
    path: 'programs',
    component: ProgramsComponent,
    resolve: {
      programs: programsResolver,
    },
  },
  { path: 'coaches', component: CoachesComponent },
  {
    path: 'coach/:coachId',
    component: CoachComponent,
    canActivate: [profileGuard],
    resolve: { coach: coachResolver },
  },
  { path: '', component: LandingComponent, data: { title: 'Pound Inc.' } },
  // { path: '**', redirectTo: '',  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
