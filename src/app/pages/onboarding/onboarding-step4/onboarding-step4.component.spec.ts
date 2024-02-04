import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStep4Component } from './onboarding-step4.component';

describe('OnboardingStep4Component', () => {
  let component: OnboardingStep4Component;
  let fixture: ComponentFixture<OnboardingStep4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingStep4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
