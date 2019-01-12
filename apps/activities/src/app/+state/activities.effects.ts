import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { Registration } from '@acme-widgets/models';

import { ActivitiesPartialState } from './activities.reducer';
import {
  LoadActivities,
  ActivitiesLoaded,
  ActivitiesLoadError,
  ActivitiesActionTypes,
  GenerateRegistry
} from './activities.actions';

@Injectable()
export class ActivitiesEffects {
  @Effect() generateRegistry = this.dataPersistence.fetch(
    ActivitiesActionTypes.GenerateRegistry,
    {
      run: (action: GenerateRegistry, state: ActivitiesPartialState) => {
        const registry = [
          new Registration(1, 'Richard', 'Hendricks', 'richard@piedpiper.com', 'Initial Coin Offering', 'Crypto is the future!'),
          new Registration(2, 'Dinesh', 'Chugtai', 'dinesh@piedpiper.com', 'Company Breakfast', 'Sounds delicious!'),
          new Registration(3, 'Gavin', 'Belson', 'gavin@hooli.com', "Gavin's Comeback Party", "I'm back!"),
          new Registration(4, 'Jared', 'Dunn', 'jared@piedpiper.com', 'Initial Coin Offering', 'Richard will be here, right?'),
          new Registration(5, 'Monica', 'Hall', 'monica@piedpiper.com', 'Initial Coin Offering', "I can't believe I got roped into this!"),
          new Registration(6, 'Laurie', 'Bream', 'laurie@bream.com', 'Hostile Takeover', "Yes..."),
        ]

        localStorage.setItem('registry', JSON.stringify(registry));
        return null;
      }
    }
  )

  @Effect() loadActivities$ = this.dataPersistence.fetch(
    ActivitiesActionTypes.LoadActivities,
    {
      run: (action: LoadActivities, state: ActivitiesPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new ActivitiesLoaded([
          'Initial Coin Offering',
          'Fundraising',
          'Hostile Takeover',
          "Gavin's Comeback Party",
          'Company Breakfast',
          'Company Retreat',
          'Quarterly All-Hands Meeting',
          "Jim's Birthday"
        ]);
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
