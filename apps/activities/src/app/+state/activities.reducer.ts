import { ActivitiesAction, ActivitiesActionTypes } from './activities.actions';

export const ACTIVITIES_FEATURE_KEY = 'activities';

/**
 * Interface for the 'Activities' data used in
 *  - ActivitiesState, and
 *  - activitiesReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface ActivitiesState {
  list: Entity[]; // list of Activities; analogous to a sql normalized table
  selectedId?: string | number; // which Activities record has been selected
  loaded: boolean; // has the Activities list been loaded
  error?: any; // last none error (if any)
}

export interface ActivitiesPartialState {
  readonly [ACTIVITIES_FEATURE_KEY]: ActivitiesState;
}

export const initialState: ActivitiesState = {
  list: [],
  loaded: false
};

export function activitiesReducer(
  state: ActivitiesState = initialState,
  action: ActivitiesAction
): ActivitiesState {
  switch (action.type) {
    case ActivitiesActionTypes.ActivitiesLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
