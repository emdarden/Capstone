import { TestBed } from '@angular/core/testing';

import { AuthLockService } from './auth-lock.service';

describe('AuthLockService', () => {
  let service: AuthLockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthLockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
