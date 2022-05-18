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
import { isEmpty } from 'lodash';
export var formatSubmitItems = function (data, length) {
    var _a;
    var inspections = [];
    var _loop_1 = function (i) {
        var newItem = {
            indexId: data[i + "_indexId"],
            name: data[i + "_name"],
            abbreviation: data[i + "_abbreviation"],
            referenceList: [],
            originReferences: (_a = data[i + "_referenceList"]) === null || _a === void 0 ? void 0 : _a.map(function (r) {
                r.referenceId = r.id;
                return r;
            }),
        };
        // 处理参考值
        var count = data[i + "_valueCount"];
        count.forEach(function (j) {
            var tmp = {};
            if (data[i + "_" + j + "_indexValue"]) {
                tmp.indexValue = data[i + "_" + j + "_indexValue"];
            }
            if (data[i + "_" + j + "_reference"] && data[i + "_referenceList"].length > 0) {
                var curReference = data[i + "_referenceList"].filter(function (r) { return r.id === data[i + "_" + j + "_reference"]; })[0] || [];
                tmp = __assign(__assign({}, tmp), curReference);
            }
            if (!isEmpty(tmp) /* && tmp?.indexValue !== undefined */) {
                newItem.referenceList.push(__assign({}, tmp));
            }
            tmp = null;
        });
        // 如果指标来源是DOCTOR，并且指标的sourceSid不是当前医生的sid，需要把当前医生的sid传过去
        if (data[i + "_source"] === 'DOCTOR' &&
            data[i + "_sourceSid"] !== localStorage.getItem('xzl-web-doctor_sid')) {
            newItem.sourceSid = localStorage.getItem('xzl-web-doctor_sid');
            newItem.source = 'DOCTOR';
        }
        // if (!isEmpty(newItem?.referenceList)){
        inspections.push(newItem);
    };
    for (var i = 0; i < length; i++) {
        _loop_1(i);
    }
    return inspections;
};
// 由于：1.存在常用指标和非常用指标情况，
// 2.有子分类的话，会根据不同分类点击tab展示，但是数据是融合在一个list里，点击哪个tab过滤哪个数据，
// 此时不好定位出索引位置。所以在设置数据源时，就把索引位置加好。后面formitem直接使用即可
export var formatDataAddIndex = function (data, addIndexNum) {
    var newData = data;
    newData.commonItems = data.commonItems.map(function (item, inx) {
        var _a;
        // 当添加条数大于0时，表示有当前新增指标，需要把新增指标的索引设置为最大的(常用+不常用总条数 - 1)，防止影响之前用户已输入的数据值
        // 例 commonItems条数=3，  noCommonItems = 2， addIndexNum = 2
        // 第一次循环  2>0        3 + 2 - 1 - 0 = 4
        // 第二次循环  2>1        3 + 2 - 1 - 1 = 3
        // 第三次循环  2>2不成立   2 - 2 = 0
        // 第四次循环  2>3不成立   3 - 2 = 1
        // 第五次循环  2>4不成立   4 - 2 = 2
        var baseInx = addIndexNum > inx
            ? data.commonItems.length + data.noCommonItems.length - 1 - inx
            : inx - addIndexNum;
        return __assign(__assign({}, item), { formIndex: (_a = item.formIndex) !== null && _a !== void 0 ? _a : baseInx });
    });
    newData.noCommonItems = data.noCommonItems.map(function (item, inx) {
        var _a;
        // 从常用指标的基础上开始累加,但不包括新添加的指标，这里减去。因为新添加的指标是在所有指标的基础上开始的索引
        var baseInx = data.commonItems.length - addIndexNum;
        return __assign(__assign({}, item), { formIndex: (_a = item.formIndex) !== null && _a !== void 0 ? _a : baseInx + inx });
    });
    console.log('newData23222', newData);
    return newData;
};
