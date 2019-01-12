import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { ActivitiesEffects } from './activities.effects';
import { LoadActivities, ActivitiesLoaded } from './activities.actions';

describe('ActivitiesEffects', () => {
  let actions: Observable<any>;
  let effects: ActivitiesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        ActivitiesEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(ActivitiesEffects);
  });

  describe('loadActivities$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadActivities() });
      expect(effects.loadActivities$).toBeObservable(
        hot('-a-|', { a: new ActivitiesLoaded([]) })
      );
    });
  });
});
