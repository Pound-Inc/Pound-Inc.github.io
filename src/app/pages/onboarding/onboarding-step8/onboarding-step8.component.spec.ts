import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStep8Component } from './onboarding-step8.component';

describe('OnboardingStep8Component', () => {
  let component: OnboardingStep8Component;
  let fixture: ComponentFixture<OnboardingStep8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingStep8Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingStep8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
