import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersStoryComponent } from './customers-story.component';

describe('CustomersStoryComponent', () => {
  let component: CustomersStoryComponent;
  let fixture: ComponentFixture<CustomersStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersStoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
