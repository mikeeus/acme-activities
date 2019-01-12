import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { Registration, User } from '@acme-widgets/models';

import { ActivitiesPartialState } from './activities.reducer';
import {
  LoadActivities,
  ActivitiesLoaded,
  ActivitiesLoadError,
  ActivitiesActionTypes,
  GenerateRegistry,
  Register,
  RegistrationError,
  SetUser
} from './activities.actions';
import { Router } from '@angular/router';

@Injectable()
export class ActivitiesEffects {
  /**
   * NOTE
   * On app start we generate the registry and add it to localStorage to 
   * simulate populating the backend db. We then check if the user has already 
   * registered.
   * 
   * In a real app we would check the JWT token in localStorage for 
   * validity by making a request to the backend. Here we just assume that a 
   * user in the localStorage means a user has signed up.
   */
  @Effect() generateRegistry = this.dataPersistence.fetch(
    ActivitiesActionTypes.GenerateRegistry,
    {
      run: (action: GenerateRegistry, state: ActivitiesPartialState) => {
        localStorage.setItem('registry', JSON.stringify(defaultRegistry));
        const user = localStorage.getItem('user')

        if (user) {
          return new SetUser(new User(JSON.parse(user)))
        } else {
          return null;
        }
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

  /**
   * Here we update the registry in localStorage and set the user.
   */
  @Effect() register$ = this.dataPersistence.fetch(
    ActivitiesActionTypes.Register,
    {
      run: (action: Register, state: ActivitiesPartialState) => {
        const { firstName, lastName, email } = action.payload;
        const user = new User({firstName, lastName, email})
        localStorage.setItem('user', JSON.stringify(user))

        const registry = JSON.parse(localStorage.getItem('registry'))
        if (registry.map(r => r.id).indexOf(action.payload.id) === -1) {
          registry.push(action.payload);
          localStorage.setItem('registry', JSON.stringify(registry));
        }

        return new SetUser(user);
      },

      onError: (action: Register, error) => {
        console.error('Error', error);
        return new RegistrationError(error);
      }
    }
  );

  @Effect() setUser$ = this.dataPersistence.fetch(
    ActivitiesActionTypes.SetUser, 
    {
      run: (action: SetUser, state: ActivitiesPartialState) => {
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