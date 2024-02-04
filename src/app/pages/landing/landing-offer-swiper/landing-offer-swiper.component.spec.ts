import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingOfferSwiperComponent } from './landing-offer-swiper.component';

describe('LandingOfferSwiperComponent', () => {
  let component: LandingOfferSwiperComponent;
  let fixture: ComponentFixture<LandingOfferSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingOfferSwiperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingOfferSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
