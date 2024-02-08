import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStep15Component } from './onboarding-step15.component';

describe('OnboardingStep15Component', () => {
  let component: OnboardingStep15Component;
  let fixture: ComponentFixture<OnboardingStep15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingStep15Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingStep15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
