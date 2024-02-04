import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStep9Component } from './onboarding-step9.component';

describe('OnboardingStep9Component', () => {
  let component: OnboardingStep9Component;
  let fixture: ComponentFixture<OnboardingStep9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingStep9Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingStep9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
