import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAddonModalComponent } from './plan-addon-modal.component';

describe('PlanAddonModalComponent', () => {
  let component: PlanAddonModalComponent;
  let fixture: ComponentFixture<PlanAddonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanAddonModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanAddonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
