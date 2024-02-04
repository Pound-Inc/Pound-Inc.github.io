import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStep11Component } from './onboarding-step11.component';

describe('OnboardingStep11Component', () => {
  let component: OnboardingStep11Component;
  let fixture: ComponentFixture<OnboardingStep11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingStep11Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingStep11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
