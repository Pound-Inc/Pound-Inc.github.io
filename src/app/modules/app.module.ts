import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../app.component';
import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbModule,
  NgbToastModule,
} from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageSwitcherComponent } from '../../common/components/language-switcher/language-switcher.component';
import { LandingComponent } from '../pages/landing/landing.component';
import { LandingHeaderComponent } from '../pages/landing/landing-header/landing-header.component';
import { LandingBodyComponent } from '../pages/landing/landing-body/landing-body.component';
import { LandingFooterComponent } from '../pages/landing/landing-footer/landing-footer.component';
import { CookieComponent } from '../../common/cookie/cookie.component';
import { LandingHeroComponent } from '../pages/landing/landing-hero/landing-hero.component';
import { LandingCategoriesComponent } from '../pages/landing/landing-categories/landing-categories.component';
import { LandingTopCoachesComponent } from '../pages/landing/landing-top-coaches/landing-top-coaches.component';
import { LandingPartnersComponent } from '../pages/landing/landing-partners/landing-partners.component';
import { LandingStoryComponent } from '../pages/landing/landing-story/landing-story.component';
import { LandingCardsComponent } from '../pages/landing/landing-cards/landing-cards.component';
import { LandingHowItWorksComponent } from '../pages/landing/landing-how-it-works/landing-how-it-works.component';
import { LandingOffCanvasComponent } from '../pages/landing/landing-off-canvas/landing-off-canvas.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { LoadingComponent } from '../../common/components/loading/loading.component';
import { LoadingService } from '../services/loading.service';
import { AdminModule } from '../admin/modules/admin.module';
import { LoginComponent } from '../auth/pages/login/login.component';
import { AuthRoutingModule } from '../auth/modules/auth-routing.module';
import { TrainingProgramComponent } from '../pages/training-program/training-program.component';
import { CoachComponent } from '../pages/coach/coach.component';
import { CoachCardComponent } from '../pages/coach/coach-card/coach-card.component';
import { CoachInfoComponent } from '../pages/coach/coach-info/coach-info.component';
import { CoachProgramsComponent } from '../pages/coach/coach-programs/coach-programs.component';
import { CoachExperiencesComponent } from '../pages/coach/coach-experiences/coach-experiences.component';
import { CustomersStoryComponent } from '../pages/coach/customers-story/customers-story.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../auth/pages/register/register.component';
import { RegisterFinalComponent } from '../auth/pages/register-final/register-final.component';
import { MaleComponent } from '../pages/male/male.component';
import { FemaleComponent } from '../pages/female/female.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoryComponent } from '../pages/story/story.component';
import { ArticleComponent } from '../pages/article/article.component';
import { CoachesComponent } from '../pages/coaches/coaches.component';
import { ProgramsComponent } from '../pages/programs/programs.component';
import { PlanCompareModalComponent } from '../pages/training-program/plan-compare-modal/plan-compare-modal.component';
import { ToastComponent } from '../../common/components/toast/toast.component';
import { ToastsComponent } from 'src/common/components/toasts/toasts.component';
import { NgTemplateOutlet } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterOkComponent } from '../auth/pages/register-ok/register-ok.component';
import { RegisterErrorComponent } from '../auth/pages/register-error/register-error.component';
import { ProgramCommentsComponent } from '../pages/training-program/program-comments/program-comments.component';
import { ProgramStoriesComponent } from '../pages/training-program/program-stories/program-stories.component';
import { PlanAddonModalComponent } from '../pages/training-program/plan-addon-modal/plan-addon-modal.component';
import { CartComponent } from '../pages/cart/cart.component';
import { LandingTopProgramsComponent } from '../pages/landing/landing-top-programs/landing-top-programs.component';
import { CardioComponent } from '../auth/pages/cardio/cardio.component';
import { NutritionComponent } from '../auth/pages/nutrition/nutrition.component';
import { PowerComponent } from '../auth/pages/power/power.component';
import { CreatePlanModalComponent } from '../admin/pages/worker-dashboard/create-plan-modal/create-plan-modal.component';
import { CreateProgramModalComponent } from '../admin/pages/worker-dashboard/create-program-modal/create-program-modal.component';
import { InvoiceComponent } from '../auth/pages/invoice/invoice.component';

import { LOCALE_ID } from '@angular/core';
import '@angular/common/locales/ar';
import { PaymentComponent } from './payment/payment.component';

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
    PlanCompareModalComponent,
    ToastComponent,
    ToastsComponent,
    RegisterOkComponent,
    RegisterErrorComponent,
    ProgramCommentsComponent,
    ProgramStoriesComponent,
    PlanAddonModalComponent,
    CartComponent,
    LandingTopProgramsComponent,
    NutritionComponent,
    CardioComponent,
    PowerComponent,
    CreateProgramModalComponent,
    CreatePlanModalComponent,
    InvoiceComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    AdminModule,
    AuthRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    NgbDatepickerModule,
    NgbAlertModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
  ],
  providers: [LoadingService, { provide: LOCALE_ID, useValue: 'ar' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
