import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStep14Component } from './onboarding-step14.component';

describe('OnboardingStep14Component', () => {
  let component: OnboardingStep14Component;
  let fixture: ComponentFixture<OnboardingStep14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingStep14Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingStep14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
