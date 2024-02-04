import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStep2Component } from './onboarding-step2.component';

describe('OnboardingStep2Component', () => {
  let component: OnboardingStep2Component;
  let fixture: ComponentFixture<OnboardingStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingStep2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
