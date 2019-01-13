import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { ActivitiesEffects, defaultActivities } from './activities.effects';
import { LoadActivities, ActivitiesLoaded } from './activities.actions';
import { ActivitiesService } from '../services';
import { fakeBackendProvider } from '../interceptors';

describe('ActivitiesEffects', () => {
  let actions: Observable<any>;
  let effects: ActivitiesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        ActivitiesEffects,
        DataPersistence,
        ActivitiesService,
        fakeBackendProvider,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(ActivitiesEffects);
  });

  describe('loadActivities$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadActivities() });
      expect(effects.loadActivities$).toBeObservable(
        hot('-a-|', { a: new ActivitiesLoaded(defaultActivities) })
      );
    });
  });
});
