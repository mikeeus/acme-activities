import { ActivitiesLoaded } from './activities.actions';
import {
  ActivitiesState,
  Entity,
  initialState,
  activitiesReducer
} from './activities.reducer';

describe('Activities Reducer', () => {
  const getActivitiesId = it => it['id'];
  let createActivities;

  beforeEach(() => {
    createActivities = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Activities actions ', () => {
    it('should return set the list of known Activities', () => {
      const activitiess = [
        createActivities('PRODUCT-AAA'),
        createActivities('PRODUCT-zzz')
      ];
      const action = new ActivitiesLoaded(activitiess);
      const result: ActivitiesState = activitiesReducer(initialState, action);
      const selId: string = getActivitiesId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = activitiesReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
