var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import React from 'react';
import FallBack from '../FallBack';
function log(error, info, props) {
}
;
function ErrorHandler(Component, errorCallback) {
    if (errorCallback === void 0) { errorCallback = log; }
    var WithErrorHandler = /** @class */ (function (_super) {
        __extends(WithErrorHandler, _super);
        function WithErrorHandler(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                hasError: false,
                error: null,
                info: null,
            };
            return _this;
        }
        WithErrorHandler.prototype.componentDidCatch = function (error, info) {
            // Update state if error happens
            this.setState({ hasError: true, error: error, info: info });
            // Report errors
            if (errorCallback) {
                errorCallback(error, info, this.props);
            }
        };
        WithErrorHandler.prototype.render = function () {
            // if state contains error we render fallback component
            if (this.state.hasError) {
                var _a = this.state, error = _a.error, info = _a.info;
                return (React.createElement(FallBack, __assign({}, this.props, { error: error, info: info })));
            }
            return React.createElement(Component, __assign({}, this.props));
        };
        return WithErrorHandler;
    }(React.Component));
    return WithErrorHandler;
}
export default ErrorHandler;
