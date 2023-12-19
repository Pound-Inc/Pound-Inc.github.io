import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { LandingComponent } from './landing/landing.component';
import { LandingHeaderComponent } from './landing/landing-header/landing-header.component';
import { LandingBodyComponent } from './landing/landing-body/landing-body.component';
import { LandingFooterComponent } from './landing/landing-footer/landing-footer.component';
import { CookieComponent } from '../common/cookie/cookie.component';
import { LandingHeroComponent } from './landing/landing-hero/landing-hero.component';
import { LandingCategoriesComponent } from './landing/landing-categories/landing-categories.component';
import { LandingTopCoachesComponent } from './landing/landing-top-coaches/landing-top-coaches.component';
import { LandingPartnersComponent } from './landing/landing-partners/landing-partners.component';
import { LandingStoryComponent } from './landing/landing-story/landing-story.component';
import { LandingCardsComponent } from './landing/landing-cards/landing-cards.component';
import { LandingHowItWorksComponent } from './landing/landing-how-it-works/landing-how-it-works.component';
import { LandingOffCanvasComponent } from './landing/landing-off-canvas/landing-off-canvas.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ProfileComponent } from './profile/profile.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './services/loading.service';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './auth/login/login.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { TrainingProgramComponent } from './training-program/training-program.component';
import { CoachComponent } from './coach/coach.component';
import { CoachCardComponent } from './coach/coach-card/coach-card.component';
import { CoachInfoComponent } from './coach/coach-info/coach-info.component';
import { CoachProgramsComponent } from './coach/coach-programs/coach-programs.component';
import { CoachExperiencesComponent } from './coach/coach-experiences/coach-experiences.component';
import { CustomersStoryComponent } from './coach/customers-story/customers-story.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { RegisterFinalComponent } from './auth/register-final/register-final.component';
import { MaleComponent } from './categories/male/male.component';
import { FemaleComponent } from './categories/female/female.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoryComponent } from './story/story.component';
import { ArticleComponent } from './article/article.component';
import { CoachesComponent } from './coaches/coaches.component';
import { ProgramsComponent } from './programs/programs.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LanguageSwitcherComponent,
    LandingComponent,
    LandingHeaderComponent,
    LandingBodyComponent,
    LandingFooterComponent,
    CookieComponent,
    LandingHeroComponent,
    LandingCategoriesComponent,
    LandingTopCoachesComponent,
    LandingPartnersComponent,
    LandingStoryComponent,
    LandingCardsComponent,
    LandingHowItWorksComponent,
    LandingOffCanvasComponent,
    TestimonialsComponent,
    ProfileComponent,
    LoadingComponent,
    LoginComponent,
    RegisterComponent,
    RegisterFinalComponent,
    TrainingProgramComponent,
    CoachComponent,
    CoachCardComponent,
    CoachInfoComponent,
    CoachProgramsComponent,
    CoachExperiencesComponent,
    CustomersStoryComponent,
    MaleComponent,
    FemaleComponent,
    StoryComponent,
    ArticleComponent,
    CoachesComponent,
    ProgramsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    AdminModule,
    AuthRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
  ],
  providers: [LoadingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
