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
  GenerateRegistry,
  Register,
  Registered,
  RegistrationError
} from './activities.actions';
import { Router } from '@angular/router';

@Injectable()
export class ActivitiesEffects {
  @Effect() generateRegistry = this.dataPersistence.fetch(
    ActivitiesActionTypes.GenerateRegistry,
    {
      run: (action: GenerateRegistry, state: ActivitiesPartialState) => {
        localStorage.setItem('registry', JSON.stringify(defaultRegistry));
        return null;
      }
    }
  )

  @Effect() loadActivities$ = this.dataPersistence.fetch(
    ActivitiesActionTypes.LoadActivities,
    {
      run: (action: LoadActivities, state: ActivitiesPartialState) => {
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

  @Effect() register$ = this.dataPersistence.fetch(
    ActivitiesActionTypes.Register,
    {
      run: (action: Register, state: ActivitiesPartialState) => {
        const { firstName, lastName, email } = action.payload;

        localStorage.setItem('user', JSON.stringify({firstName, lastName, email}))

        return new Registered(action.payload);
      },

      onError: (action: Register, error) => {
        console.error('Error', error);
        return new RegistrationError(error);
      }
    }
  );

  @Effect() registered$ = this.dataPersistence.fetch(
    ActivitiesActionTypes.Registered,
    {
      run: (action: Registered, state: ActivitiesPartialState) => {
        this.router.navigate(['registrations']);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private dataPersistence: DataPersistence<ActivitiesPartialState>
  ) {}
}

const defaultRegistry = [
  new Registration({
    id: 1,
    firstName: 'Richard',
    lastName: 'Hendricks',
    email: 'richard@piedpiper.com',
    activity: 'Initial Coin Offering',
    comments: 'Crypto is the future!'
  }),
  new Registration({
    id: 2,
    firstName: 'Dinesh',
    lastName: 'Chugtai',
    email: 'dinesh@piedpiper.com',
    activity: 'Company Breakfast',
    comments: 'Sounds delicious!'
  }),
  new Registration({
    id: 3,
    firstName: 'Gavin',
    lastName: 'Belson',
    email: 'gavin@hooli.com',
    activity: "Gavin's Comeback Party",
    comments: "I'm back!"
  }),
  new Registration({
    id: 4,
    firstName: 'Jared',
    lastName: 'Dunn',
    email: 'jared@piedpiper.com',
    activity: 'Initial Coin Offering',
    comments: 'Richard will be here, right?'
  }),
  new Registration({
    id: 5,
    firstName: 'Monica',
    lastName: 'Hall',
    email: 'monica@piedpiper.com',
    activity: 'Initial Coin Offering',
    comments: "I can't believe I got roped into this!"
  }),
  new Registration({
    id: 6,
    firstName: 'Laurie',
    lastName: 'Bream',
    email: 'laurie@bream.com',
    activity: 'Hostile Takeover',
    comments: "Yes..."
  }),
]