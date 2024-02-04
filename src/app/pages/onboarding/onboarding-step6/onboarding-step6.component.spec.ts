import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStep6Component } from './onboarding-step6.component';

describe('OnboardingStep6Component', () => {
  let component: OnboardingStep6Component;
  let fixture: ComponentFixture<OnboardingStep6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingStep6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingStep6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
