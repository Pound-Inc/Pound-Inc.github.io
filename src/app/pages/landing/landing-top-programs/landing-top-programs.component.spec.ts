import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingTopProgramsComponent } from './landing-top-programs.component';

describe('LandingTopProgramsComponent', () => {
  let component: LandingTopProgramsComponent;
  let fixture: ComponentFixture<LandingTopProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingTopProgramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingTopProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
