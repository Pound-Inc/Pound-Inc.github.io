import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachExperiencesComponent } from './coach-experiences.component';

describe('CoachExperiencesComponent', () => {
  let component: CoachExperiencesComponent;
  let fixture: ComponentFixture<CoachExperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachExperiencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
