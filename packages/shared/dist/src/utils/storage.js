/**
 * storage再封装
 * 需要在./data中注册后的字段才可以运行存储
 */
/* eslint-disable */
// 引入注册列表
// import { config } from './data';
// import pkg from '../../package.json';
// // 存储变量添加统一前缀(例如：项目_ 下划线分割的方式)
// const pre = `${pkg.name}_`;
/**
 * 核心：阻止未注册key添加到存储中——装饰模式优化setItem方法
 * 考虑到没有添加就不会有获取和删除，所以只对setItem做处理
 */
var setOptimize = function (setItem) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // setItem第一个入参为key
        // const [key] = args;
        // 自定义注册列表config中，如果不包含当前key(需要截取掉自定义前缀)则阻止存入，并添加友善提示
        // if (!config.includes(key.substr(pre.length))) {
        //   // 如果有eslint配置禁用console，可以自行添加 // eslint-disable-next-line
        //   console.warn('当前字面量' + key + '未配置缓存，请在/src/tools/localStorage/data中注入属性');
        // } else {
        //   // 如果已注册则直接返回原储存方法即可
        return setItem.apply(this, args);
        // }
    };
};
// 获取原型并调用优化方法
// 重写调用本地存储的方法，统一项目的调用方式
var Storage = /** @class */ (function () {
    function Storage(pre, type) {
        this.storageType = type || 'localStorage';
        this.pre = pre + "_" || 'xzl-web-default_';
        this.init();
    }
    Storage.prototype.setType = function (type) {
        this.storageType = type;
        return this;
    };
    Storage.prototype.init = function () {
        var storageType = this.storageType;
        Object.getPrototypeOf(window[storageType]).setItem = setOptimize(Object.getPrototypeOf(window[storageType]).setItem);
        return this;
    };
    Storage.prototype.getItem = function (key) {
        var _a = this, storageType = _a.storageType, pre = _a.pre;
        return window[storageType].getItem(pre + key);
    };
    Storage.prototype.setItem = function (key, value) {
        var _a = this, storageType = _a.storageType, pre = _a.pre;
        return window[storageType].setItem(pre + key, value);
    };
    Storage.prototype.removeItem = function (key) {
        var _a = this, storageType = _a.storageType, pre = _a.pre;
        return window[storageType].removeItem(pre + key);
    };
    Storage.prototype.clear = function () {
        var _a = this, storageType = _a.storageType, pre = _a.pre;
        return window[storageType].removeItem(pre + 'access_token');
    };
    return Storage;
}());
;
var storage = function (pre, type) { return new Storage(pre, type); };
export default storage;
