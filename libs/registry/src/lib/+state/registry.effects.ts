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
  DeleteRegistrationError,
  DeleteRegistrationSuccess
} from './registry.actions';
import { Router } from '@angular/router';
import { RegistrationsService } from '../services';
import { map } from 'rxjs/operators';

@Injectable()
export class RegistryEffects {
  @Effect() loadRegistry$ = this.dataPersistence.fetch(
    RegistryActionTypes.LoadRegistry,
    {
      run: (action: LoadRegistry, state: RegistryPartialState) => {
        return this.registrationsService
          .load()
          .pipe(
            map(registrations => new RegistryLoaded(registrations))
          )
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
        return this.registrationsService
          .delete(action.payload)
          .pipe(
            map(() => new DeleteRegistrationSuccess(action.payload))
          )
      },

      onError: (action: DeleteRegistration, error) => {
        console.error('Error', error);
        return new DeleteRegistrationError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private registrationsService: RegistrationsService,
    private router: Router,
    private dataPersistence: DataPersistence<RegistryPartialState>
  ) {}
}
