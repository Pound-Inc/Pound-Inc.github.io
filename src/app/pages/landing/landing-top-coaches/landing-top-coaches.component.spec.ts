import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingTopCoachesComponent } from './landing-top-coaches.component';

describe('LandingTopCoachesComponent', () => {
  let component: LandingTopCoachesComponent;
  let fixture: ComponentFixture<LandingTopCoachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingTopCoachesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingTopCoachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
