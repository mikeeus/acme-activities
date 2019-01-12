import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { RegistryEffects } from './registry.effects';
import { LoadRegistry, RegistryLoaded } from './registry.actions';

describe('RegistryEffects', () => {
  let actions: Observable<any>;
  let effects: RegistryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        RegistryEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(RegistryEffects);
  });

  describe('loadRegistry$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadRegistry() });
      expect(effects.loadRegistry$).toBeObservable(
        hot('-a-|', { a: new RegistryLoaded([]) })
      );
    });
  });
});
