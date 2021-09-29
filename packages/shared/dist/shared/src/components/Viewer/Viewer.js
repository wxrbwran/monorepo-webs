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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ViewerCore from './ViewerCore';
export default (function (props) {
    var defaultContainer = React.useRef(typeof document !== 'undefined' ? document.createElement('div') : null);
    var _a = __read(React.useState(props.container), 2), container = _a[0], setContainer = _a[1];
    var _b = __read(React.useState(false), 2), init = _b[0], setInit = _b[1];
    React.useEffect(function () {
        document.body.appendChild(defaultContainer.current);
    }, []);
    React.useEffect(function () {
        if (props.visible && !init) {
            setInit(true);
        }
    }, [props.visible, init]);
    React.useEffect(function () {
        if (props.container) {
            setContainer(props.container);
        }
        else {
            setContainer(defaultContainer.current);
        }
    }, [props.container]);
    if (!init) {
        return null;
    }
    return ReactDOM.createPortal((React.createElement(ViewerCore, __assign({}, props))), container);
});
