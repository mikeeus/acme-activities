import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ACTIVITIES_FEATURE_KEY, ActivitiesState } from './activities.reducer';

// Lookup the 'Activities' feature state managed by NgRx
const getActivitiesState = createFeatureSelector<ActivitiesState>(
  ACTIVITIES_FEATURE_KEY
);

const getLoaded = createSelector(
  getActivitiesState,
  (state: ActivitiesState) => state.loaded
);
const getError = createSelector(
  getActivitiesState,
  (state: ActivitiesState) => state.error
);

const getAllActivities = createSelector(
  getActivitiesState,
  getLoaded,
  (state: ActivitiesState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getActivitiesState,
  (state: ActivitiesState) => state.selectedId
);
const getSelectedActivities = createSelector(
  getAllActivities,
  getSelectedId,
  (activities, id) => {
    const result = activities.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const activitiesQuery = {
  getLoaded,
  getError,
  getAllActivities,
  getSelectedActivities
};
