import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogLandingComponent } from './blog-landing.component';

describe('BlogLandingComponent', () => {
  let component: BlogLandingComponent;
  let fixture: ComponentFixture<BlogLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
