import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramStoriesComponent } from './program-stories.component';

describe('ProgramStoriesComponent', () => {
  let component: ProgramStoriesComponent;
  let fixture: ComponentFixture<ProgramStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramStoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
