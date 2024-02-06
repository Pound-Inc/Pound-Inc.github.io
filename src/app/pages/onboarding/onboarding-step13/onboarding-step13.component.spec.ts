import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStep13Component } from './onboarding-step13.component';

describe('OnboardingStep13Component', () => {
  let component: OnboardingStep13Component;
  let fixture: ComponentFixture<OnboardingStep13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingStep13Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingStep13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
