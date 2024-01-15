import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerDetailsModalComponent } from './planner-details-modal.component';

describe('PlannerDetailsModalComponent', () => {
  let component: PlannerDetailsModalComponent;
  let fixture: ComponentFixture<PlannerDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannerDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
