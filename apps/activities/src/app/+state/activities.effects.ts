import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { Registration, Activity } from '@acme-widgets/models';

import { ActivitiesPartialState } from './activities.reducer';
import {
  LoadActivities,
  ActivitiesLoaded,
  ActivitiesLoadError,
  ActivitiesActionTypes,
  CheckRegistered,
  Register,
  RegistrationError,
  Registered
} from './activities.actions';
import { Router } from '@angular/router';
import { ActivitiesService } from '../services';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ActivitiesEffects {
  @Effect() checkRegistered = this.dataPersistence.fetch(
    ActivitiesActionTypes.CheckRegistered,
    {
      run: (action: CheckRegistered, state: ActivitiesPartialState) => {
        const registration = localStorage.getItem('registration')

        if (registration) {
          this.router.navigate(['registrations'])
        }
      }
    }
  )

  @Effect() loadActivities$ = this.dataPersistence.fetch(
    ActivitiesActionTypes.LoadActivities,
    {
      run: (action: LoadActivities, state: ActivitiesPartialState) => {
        return new ActivitiesLoaded(defaultActivities);
      },

      onError: (action: LoadActivities, error) => {
        console.error('Error', error);
        return new ActivitiesLoadError(error);
      }
    }
  );

  /**
   * Here we update the registry in localStorage and set registration.
   */
  @Effect() register$ = this.dataPersistence.fetch(
    ActivitiesActionTypes.Register,
    {
      run: (action: Register, state: ActivitiesPartialState) => {
        return this.activitiesService.register(action.payload).pipe(
          tap(registration =>
            localStorage.setItem('registration', JSON.stringify(registration))
          ),
          map(registration => new Registered(registration))
        )
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
    private activitiesService: ActivitiesService,
    private router: Router,
    private dataPersistence: DataPersistence<ActivitiesPartialState>
  ) {}
}

export const defaultActivities = [
  new Activity(1, 'Initial Coin Offering'),
  new Activity(2, 'Fundraising'),
  new Activity(3, 'Hostile Takeover'),
  new Activity(4, "Gavin's Comeback Party"),
  new Activity(5, 'Company Breakfast'),
  new Activity(6, 'Company Retreat'),
  new Activity(7, 'Quarterly All-Hands Meeting'),
  new Activity(8, "Jim's Birthday"),
];

export const defaultRegistry = [
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