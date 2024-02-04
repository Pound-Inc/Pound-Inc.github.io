import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStep10Component } from './onboarding-step10.component';

describe('OnboardingStep10Component', () => {
  let component: OnboardingStep10Component;
  let fixture: ComponentFixture<OnboardingStep10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingStep10Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingStep10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
