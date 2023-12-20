import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingOffCanvasComponent } from './landing-off-canvas.component';

describe('LandingOffCanvasComponent', () => {
  let component: LandingOffCanvasComponent;
  let fixture: ComponentFixture<LandingOffCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingOffCanvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingOffCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
