import { RegistryAction, RegistryActionTypes } from './registry.actions';
import { Registration } from '@acme-widgets/models';

export const REGISTRY_FEATURE_KEY = 'registry';

/**
 * Interface for the 'Registry' data used in
 *  - RegistryState, and
 *  - registryReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */

export interface RegistryState {
  list: Registration[]; // list of Registry; analogous to a sql normalized table
  selectedId?: string | number; // which Registry record has been selected
  loading: boolean;
  loaded: boolean; // has the Registry list been loaded
  error?: any; // last none error (if any)
}

export interface RegistryPartialState {
  readonly [REGISTRY_FEATURE_KEY]: RegistryState;
}

export const initialState: RegistryState = {
  list: [],
  loading: false,
  loaded: false
};

export function registryReducer(
  state: RegistryState = initialState,
  action: RegistryAction
): RegistryState {
  switch (action.type) {
    case RegistryActionTypes.LoadRegistry: {
      state = {
        ...state,
        loading: true
      };
      break;
    }

    case RegistryActionTypes.RegistryLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }

    case RegistryActionTypes.DeleteRegistration: {
      state = {
        ...state,
        loading: true
      };
      break;
    }

    case RegistryActionTypes.DeleteRegistrationSuccess: {
      state = {
        ...state,
        list: state.list.filter(r => r.id !== action.payload),
        loading: false
      };
      break;
    }
  }
  return state;
}
