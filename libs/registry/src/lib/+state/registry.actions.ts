import { Action } from '@ngrx/store';
import { Entity } from './registry.reducer';

export enum RegistryActionTypes {
  LoadRegistry = '[Registry] Load Registry',
  RegistryLoaded = '[Registry] Registry Loaded',
  RegistryLoadError = '[Registry] Registry Load Error'
}

export class LoadRegistry implements Action {
  readonly type = RegistryActionTypes.LoadRegistry;
}

export class RegistryLoadError implements Action {
  readonly type = RegistryActionTypes.RegistryLoadError;
  constructor(public payload: any) {}
}

export class RegistryLoaded implements Action {
  readonly type = RegistryActionTypes.RegistryLoaded;
  constructor(public payload: Entity[]) {}
}

export type RegistryAction = LoadRegistry | RegistryLoaded | RegistryLoadError;

export const fromRegistryActions = {
  LoadRegistry,
  RegistryLoaded,
  RegistryLoadError
};
