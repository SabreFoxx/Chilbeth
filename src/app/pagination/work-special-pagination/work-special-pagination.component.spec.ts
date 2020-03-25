import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSpecialPaginationComponent } from './work-special-pagination.component';

describe('WorkSpecialPaginationComponent', () => {
  let component: WorkSpecialPaginationComponent;
  let fixture: ComponentFixture<WorkSpecialPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkSpecialPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSpecialPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
