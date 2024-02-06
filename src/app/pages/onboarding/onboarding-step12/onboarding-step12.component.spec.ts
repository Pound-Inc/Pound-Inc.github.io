import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStep12Component } from './onboarding-step12.component';

describe('OnboardingStep12Component', () => {
  let component: OnboardingStep12Component;
  let fixture: ComponentFixture<OnboardingStep12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingStep12Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingStep12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
