import { Action } from '@ngrx/store';
import { Registration } from '@acme-widgets/models';

export enum RegistryActionTypes {
  LoadRegistry = '[Registry] Load Registry',
  RegistryLoaded = '[Registry] Registry Loaded',
  RegistryLoadError = '[Registry] Registry Load Error',

  DeleteRegistration = '[Registry] Delete Registration',
  DeleteRegistrationSuccess = '[Registry] Delete Registration Success',
  DeleteRegistrationError = '[Registry] Delete Registration Error',
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
  constructor(public payload: Registration[]) {}
}

export class DeleteRegistration implements Action {
  readonly type = RegistryActionTypes.DeleteRegistration;
  constructor(public payload: number) {}
}

export class DeleteRegistrationSuccess implements Action {
  readonly type = RegistryActionTypes.DeleteRegistrationSuccess;
  constructor(public payload: number) {}
}

export class DeleteRegistrationError implements Action {
  readonly type = RegistryActionTypes.DeleteRegistrationError;
  constructor(public payload: any) {}
}


export type RegistryAction = LoadRegistry
  | RegistryLoaded
  | RegistryLoadError
  | DeleteRegistration
  | DeleteRegistrationError
  | DeleteRegistrationSuccess;

export const fromRegistryActions = {
  LoadRegistry,
  RegistryLoaded,
  RegistryLoadError,

  DeleteRegistration,
  DeleteRegistrationSuccess,
  DeleteRegistrationError
};
