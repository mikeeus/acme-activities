import { async, TestBed } from '@angular/core/testing';
import { RegistrationsModule } from './registrations.module';

describe('RegistrationsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RegistrationsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(RegistrationsModule).toBeDefined();
  });
});
