import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingStoryComponent } from './landing-story.component';

describe('LandingStoryComponent', () => {
  let component: LandingStoryComponent;
  let fixture: ComponentFixture<LandingStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingStoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
