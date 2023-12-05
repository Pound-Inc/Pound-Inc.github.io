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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
