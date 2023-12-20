import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingHowItWorksComponent } from './landing-how-it-works.component';

describe('LandingHowItWorksComponent', () => {
  let component: LandingHowItWorksComponent;
  let fixture: ComponentFixture<LandingHowItWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingHowItWorksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingHowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
