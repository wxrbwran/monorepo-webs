import engine from 'store/src/store-engine';
import plugin from 'store/plugins/defaults';
import localS from 'store/storages/localStorage';
import sessionS from 'store/storages/sessionStorage';
export default function createWebStorage(type) {
    var storage = null;
    switch (type) {
        case 'local': {
            var storages = [localS];
            var plugins = [plugin];
            storage = engine.createStore(storages, plugins);
            break;
        }
        case 'session': {
            var storages = [sessionS];
            var plugins = [plugin];
            storage = engine.createStore(storages, plugins);
            break;
        }
        default:
            throw new Error('Unknown type!');
    }
    return storage;
}
