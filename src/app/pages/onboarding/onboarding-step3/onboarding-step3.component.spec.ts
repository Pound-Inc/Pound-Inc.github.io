import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStep3Component } from './onboarding-step3.component';

describe('OnboardingStep3Component', () => {
  let component: OnboardingStep3Component;
  let fixture: ComponentFixture<OnboardingStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingStep3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
