import storage from './storage/session';
var config = {
    key: 'model',
    storage: storage,
    blacklist: [
        '@@dva',
        'routing'
    ],
    whitelist: [],
    keyPrefix: 'persist',
};
export default config;
