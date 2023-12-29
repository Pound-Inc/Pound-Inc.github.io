import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgramModalComponent } from './create-program-modal.component';

describe('CreateProgramModalComponent', () => {
  let component: CreateProgramModalComponent;
  let fixture: ComponentFixture<CreateProgramModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProgramModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProgramModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
