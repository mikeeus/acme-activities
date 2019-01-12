import { createFeatureSelector, createSelector } from '@ngrx/store';
import { REGISTRY_FEATURE_KEY, RegistryState } from './registry.reducer';

// Lookup the 'Registry' feature state managed by NgRx
const getRegistryState = createFeatureSelector<RegistryState>(
  REGISTRY_FEATURE_KEY
);

const getLoaded = createSelector(
  getRegistryState,
  (state: RegistryState) => state.loaded
);
const getError = createSelector(
  getRegistryState,
  (state: RegistryState) => state.error
);

const getAllRegistrations = createSelector(
  getRegistryState,
  getLoaded,
  (state: RegistryState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getRegistryState,
  (state: RegistryState) => state.selectedId
);
const getSelectedRegistry = createSelector(
  getAllRegistrations,
  getSelectedId,
  (registry, id) => {
    const result = registry.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const registryQuery = {
  getLoaded,
  getError,
  getAllRegistrations,
  getSelectedRegistry
};
