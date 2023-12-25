import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramCommentsComponent } from './program-comments.component';

describe('ProgramCommentsComponent', () => {
  let component: ProgramCommentsComponent;
  let fixture: ComponentFixture<ProgramCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
