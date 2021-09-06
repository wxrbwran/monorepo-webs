import engine from 'store/src/store-engine';
import plugin from 'store/plugins/defaults';
import localS from 'store/storages/localStorage';
import sessionS from 'store/storages/sessionStorage';

export default function createWebStorage (type) {
  let storage = null;
  switch (type) {
    case 'local': {
      const storages = [localS];
      const plugins = [plugin];
      storage = engine.createStore(storages, plugins);
      break;
    }
    case 'session': {
      const storages = [sessionS];
      const plugins = [plugin];
      storage = engine.createStore(storages, plugins);
      break;
    }
    default:
      throw new Error('Unknown type!');
  }
  return storage;
}
