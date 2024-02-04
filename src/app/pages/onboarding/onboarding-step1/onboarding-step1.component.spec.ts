import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStep1Component } from './onboarding-step1.component';

describe('OnboardingStep1Component', () => {
  let component: OnboardingStep1Component;
  let fixture: ComponentFixture<OnboardingStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingStep1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
