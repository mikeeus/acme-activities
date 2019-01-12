import { RegistryLoaded } from './registry.actions';
import {
  RegistryState,
  Entity,
  initialState,
  registryReducer
} from './registry.reducer';

describe('Registry Reducer', () => {
  const getRegistryId = it => it['id'];
  let createRegistry;

  beforeEach(() => {
    createRegistry = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Registry actions ', () => {
    it('should return set the list of known Registry', () => {
      const registrys = [
        createRegistry('PRODUCT-AAA'),
        createRegistry('PRODUCT-zzz')
      ];
      const action = new RegistryLoaded(registrys);
      const result: RegistryState = registryReducer(initialState, action);
      const selId: string = getRegistryId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = registryReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
