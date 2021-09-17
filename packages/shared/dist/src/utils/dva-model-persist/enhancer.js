var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import _ from 'lodash';
import defaultOptions from './config';
var lastState = {};
export default function (opts) {
    if (opts === void 0) { opts = {}; }
    var _a = __assign(__assign({}, defaultOptions), opts), key = _a.key, keyPrefix = _a.keyPrefix, blacklist = _a.blacklist, whitelist = _a.whitelist, storage = _a.storage;
    var defaultState = storage.get(keyPrefix + ":" + key);
    return function (createStore) { return function (reducer, initialState, enhancer) {
        if (initialState === void 0) { initialState = defaultState; }
        var store = createStore(reducer, __assign(__assign({}, initialState), defaultState), enhancer);
        function dispatch(action) {
            var res = store.dispatch(action);
            var thatState = store.getState();
            if (_.isArray(whitelist) && !_.isEmpty(whitelist)) {
                thatState = _.pick(thatState, whitelist);
            }
            else if (_.isArray(blacklist) && !_.isEmpty(blacklist)) {
                thatState = _.omit(thatState, blacklist);
            }
            if (!_.isEqual(lastState, thatState)) {
                // lastState = _.merge(lastState, thatState);
                storage.set(keyPrefix + ":" + key, thatState);
            }
            return res;
        }
        return __assign(__assign({}, store), { dispatch: dispatch });
    }; };
}
