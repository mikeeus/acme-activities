import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { RegistryPartialState } from './registry.reducer';
import {
  LoadRegistry,
  RegistryLoaded,
  RegistryLoadError,
  RegistryActionTypes,
  DeleteRegistration,
  DeleteRegistrationError
} from './registry.actions';
import { Router } from '@angular/router';

@Injectable()
export class RegistryEffects {
  @Effect() loadRegistry$ = this.dataPersistence.fetch(
    RegistryActionTypes.LoadRegistry,
    {
      run: (action: LoadRegistry, state: RegistryPartialState) => {
        const registry = JSON.parse(localStorage.getItem('registry'))
        return new RegistryLoaded(registry);
      },

      onError: (action: LoadRegistry, error) => {
        console.error('Error', error);
        return new RegistryLoadError(error);
      }
    }
  );

  /**
   * If the registration is found, delete it, update the localStorage and set 
   * user to null.
   */
  @Effect() deleteRegistration$ = this.dataPersistence.fetch(
    RegistryActionTypes.DeleteRegistration,
    {
      run: (action: DeleteRegistration, state: RegistryPartialState) => {
        let registry = JSON.parse(localStorage.getItem('registry'))
        if (registry.map(r => r.id).indexOf(action.payload) !== -1) {
          registry = registry.filter(r => r.id !== action.payload)
          localStorage.setItem('registry', JSON.stringify(registry))
          localStorage.removeItem('registration');
          this.router.navigate(['']);
          return new RegistryLoaded(registry);
        }
      },

      onError: (action: DeleteRegistration, error) => {
        console.error('Error', error);
        return new DeleteRegistrationError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private dataPersistence: DataPersistence<RegistryPartialState>
  ) {}
}
