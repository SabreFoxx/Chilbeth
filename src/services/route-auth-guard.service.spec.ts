import { TestBed } from '@angular/core/testing';

import { RouteAuthGuardService } from './route-auth-guard.service';

describe('RouteAuthGuardService', () => {
  let service: RouteAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
