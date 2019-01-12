import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { RegistryPartialState } from './registry.reducer';
import {
  LoadRegistry,
  RegistryLoaded,
  RegistryLoadError,
  RegistryActionTypes
} from './registry.actions';

@Injectable()
export class RegistryEffects {
  @Effect() loadRegistry$ = this.dataPersistence.fetch(
    RegistryActionTypes.LoadRegistry,
    {
      run: (action: LoadRegistry, state: RegistryPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new RegistryLoaded([]);
      },

      onError: (action: LoadRegistry, error) => {
        console.error('Error', error);
        return new RegistryLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<RegistryPartialState>
  ) {}
}
