import { Action } from '@ngrx/store';
import { Entity } from './activities.reducer';

export enum ActivitiesActionTypes {
  LoadActivities = '[Activities] Load Activities',
  ActivitiesLoaded = '[Activities] Activities Loaded',
  ActivitiesLoadError = '[Activities] Activities Load Error'
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
  constructor(public payload: Entity[]) {}
}

export type ActivitiesAction =
  | LoadActivities
  | ActivitiesLoaded
  | ActivitiesLoadError;

export const fromActivitiesActions = {
  LoadActivities,
  ActivitiesLoaded,
  ActivitiesLoadError
};
