import { Action } from '@ngrx/store';
import { Registration, User } from '@acme-widgets/models';

export enum ActivitiesActionTypes {
  LoadActivities = '[Activities] Load Activities',
  ActivitiesLoaded = '[Activities] Activities Loaded',
  ActivitiesLoadError = '[Activities] Activities Load Error',

  Register = '[Activities] Register',
  RegistrationError = '[Activities] Registration Error',

  SetUser = '[Activities] Set User',

  GenerateRegistry = '[Activities] Generate Registry'
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
  constructor(public payload: string[]) {}
}

export class GenerateRegistry implements Action {
  readonly type = ActivitiesActionTypes.GenerateRegistry;
}

export class Register implements Action {
  readonly type = ActivitiesActionTypes.Register;
  constructor(public payload: Registration) {}
}

export class RegistrationError implements Action {
  readonly type = ActivitiesActionTypes.RegistrationError;
  constructor(public payload: any) {}
}

export class SetUser implements Action {
  readonly type = ActivitiesActionTypes.SetUser;
  constructor(public payload: User) {}
}

export type ActivitiesAction =
  | LoadActivities
  | ActivitiesLoaded
  | ActivitiesLoadError
  | GenerateRegistry
  | Register
  | RegistrationError
  | SetUser;

export const fromActivitiesActions = {
  LoadActivities,
  ActivitiesLoaded,
  ActivitiesLoadError,
  GenerateRegistry,
  Register,
  RegistrationError,
  SetUser
};
