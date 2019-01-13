import { Action } from '@ngrx/store';
import { Registration, Activity } from '@acme-widgets/models';

export enum ActivitiesActionTypes {
  LoadActivities = '[Activities] Load Activities',
  ActivitiesLoaded = '[Activities] Activities Loaded',
  ActivitiesLoadError = '[Activities] Activities Load Error',

  Register = '[Activities] Register',
  Registered = '[Activities] Registered',
  RegistrationError = '[Activities] Registration Error',

  CheckRegistered = '[Activities] Check Registered'
}

export class LoadActivities implements Action {
  readonly type = ActivitiesActionTypes.LoadActivities;
}

export class ActivitiesLoadError implements Action {
  readonly type = ActivitiesActionTypes.ActivitiesLoadError;
  constructor(public payload: any) {}
}

export class ActivitiesLoaded implements Action {
  readonly type = ActivitiesActionTypes.ActivitiesLoaded;
  constructor(public payload: Activity[]) {}
}

export class CheckRegistered implements Action {
  readonly type = ActivitiesActionTypes.CheckRegistered;
}

export class Register implements Action {
  readonly type = ActivitiesActionTypes.Register;
  constructor(public payload: Registration) {}
}

export class Registered implements Action {
  readonly type = ActivitiesActionTypes.Registered;
  constructor(public payload: Registration) {}
}

export class RegistrationError implements Action {
  readonly type = ActivitiesActionTypes.RegistrationError;
  constructor(public payload: any) {}
}

export type ActivitiesAction =
  | LoadActivities
  | ActivitiesLoaded
  | ActivitiesLoadError
  | CheckRegistered
  | Register
  | Registered
  | RegistrationError;

export const fromActivitiesActions = {
  LoadActivities,
  ActivitiesLoaded,
  ActivitiesLoadError,
  CheckRegistered,
  Register,
  Registered,
  RegistrationError
};
