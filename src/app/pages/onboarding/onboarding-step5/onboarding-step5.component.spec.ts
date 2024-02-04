import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStep5Component } from './onboarding-step5.component';

describe('OnboardingStep5Component', () => {
  let component: OnboardingStep5Component;
  let fixture: ComponentFixture<OnboardingStep5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingStep5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingStep5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
