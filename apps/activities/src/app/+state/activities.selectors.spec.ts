import { ActivitiesState } from './activities.reducer';
import { activitiesQuery } from './activities.selectors';
import { Activity } from '@acme-widgets/models';

describe('Activities Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getActivitiesId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createActivities = (id: number, name = ''): Activity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      activities: {
        list: [
          createActivities(1),
          createActivities(2),
          createActivities(3)
        ],
        selectedId: 2,
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Activities Selectors', () => {
    it('getAllActivities() should return the list of Activities', () => {
      const results = activitiesQuery.getAllActivities(storeState);
      const selId = getActivitiesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe(2);
    });

    it('getSelectedActivities() should return the selected Activity', () => {
      const result = activitiesQuery.getSelectedActivities(storeState);
      const selId = getActivitiesId(result);

      expect(selId).toBe(2);
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = activitiesQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = activitiesQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
