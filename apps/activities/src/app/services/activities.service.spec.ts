import { TestBed } from '@angular/core/testing';

import { ActivitiesService } from './activities.service';
import { fakeBackendProvider } from '../interceptors';
import { HttpClientModule } from '@angular/common/http';

describe('ActivitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      fakeBackendProvider
    ]
  }));

  it('should be created', () => {
    const service: ActivitiesService = TestBed.get(ActivitiesService);
    expect(service).toBeTruthy();
  });
});
