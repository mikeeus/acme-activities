import { Action } from '@ngrx/store';

export enum ActivitiesActionTypes {
  LoadActivities = '[Activities] Load Activities',
  ActivitiesLoaded = '[Activities] Activities Loaded',
  ActivitiesLoadError = '[Activities] Activities Load Error',

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

export type ActivitiesAction =
  | LoadActivities
  | ActivitiesLoaded
  | ActivitiesLoadError
  | GenerateRegistry;

export const fromActivitiesActions = {
  LoadActivities,
  ActivitiesLoaded,
  ActivitiesLoadError,
  GenerateRegistry
};
