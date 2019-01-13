import { TestBed } from '@angular/core/testing';

import { RegistrationsService } from './registrations.service';

describe('RegistrationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrationsService = TestBed.get(RegistrationsService);
    expect(service).toBeTruthy();
  });
});
