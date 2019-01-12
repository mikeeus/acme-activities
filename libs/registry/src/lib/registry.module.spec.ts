import { async, TestBed } from '@angular/core/testing';
import { RegistryModule } from './registry.module';

describe('RegistryModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RegistryModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(RegistryModule).toBeDefined();
  });
});
