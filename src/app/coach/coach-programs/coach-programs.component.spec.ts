import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachProgramsComponent } from './coach-programs.component';

describe('CoachProgramsComponent', () => {
  let component: CoachProgramsComponent;
  let fixture: ComponentFixture<CoachProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachProgramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
