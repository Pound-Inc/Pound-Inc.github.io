import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStep7Component } from './onboarding-step7.component';

describe('OnboardingStep7Component', () => {
  let component: OnboardingStep7Component;
  let fixture: ComponentFixture<OnboardingStep7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingStep7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingStep7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
