import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCompareModalComponent } from './plan-compare-modal.component';

describe('PlanCompareModalComponent', () => {
  let component: PlanCompareModalComponent;
  let fixture: ComponentFixture<PlanCompareModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanCompareModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanCompareModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
