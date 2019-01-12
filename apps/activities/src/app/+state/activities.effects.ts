import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { ActivitiesPartialState } from './activities.reducer';
import {
  LoadActivities,
  ActivitiesLoaded,
  ActivitiesLoadError,
  ActivitiesActionTypes
} from './activities.actions';

@Injectable()
export class ActivitiesEffects {
  @Effect() loadActivities$ = this.dataPersistence.fetch(
    ActivitiesActionTypes.LoadActivities,
    {
      run: (action: LoadActivities, state: ActivitiesPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new ActivitiesLoaded([]);
      },

      onError: (action: LoadActivities, error) => {
        console.error('Error', error);
        return new ActivitiesLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ActivitiesPartialState>
  ) {}
}
