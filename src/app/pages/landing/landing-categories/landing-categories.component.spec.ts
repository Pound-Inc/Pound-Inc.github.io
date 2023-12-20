import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCategoriesComponent } from './landing-categories.component';

describe('LandingCategoriesComponent', () => {
  let component: LandingCategoriesComponent;
  let fixture: ComponentFixture<LandingCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
