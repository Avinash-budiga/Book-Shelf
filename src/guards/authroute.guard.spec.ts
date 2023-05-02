import { TestBed } from '@angular/core/testing';

import { AuthrouteGuard } from './authroute.guard';

describe('AuthrouteGuard', () => {
  let guard: AuthrouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthrouteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
