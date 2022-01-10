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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { cloneDeep } from 'lodash';
import dayjs from 'dayjs';
export var fileTypes = [
    {
        name: '视频',
        code: 1,
        type: 'video',
    }, {
        name: '文件',
        code: 2,
        type: 'document',
    }, {
        name: '文章',
        code: 3,
        type: 'article',
    }, {
        name: '图片',
        code: 4,
        type: 'picture',
    }, {
        name: '音频',
        code: 6,
        type: 'audio',
    },
    {
        name: '随访表',
        code: -1000,
        type: 'accompany',
    },
    {
        name: 'CRF量表',
        code: -2000,
        type: 'crf',
    },
    // type='accompany'
];
export var sendType = [
    {
        key: 'CUSTOM',
        value: '自定义',
    }, {
        key: 'LOOP',
        value: '循环下发',
    }, {
        key: 'NONE',
        value: '无',
    },
];
export var AfterPatientBind = '患者与我绑定日期后';
export var DIY = '自定义';
export var ImmediatelySend = '立即发送';
export var SpecificDate = '选择特定日期';
export var PlanCreatedSendImmediately = '计划创建成功后立即发送';
export var FirstTimeModel = {
    childItemType: 'select',
    description: '首次发送时间',
    childItem: [
        {
            childItemType: 'select',
            description: AfterPatientBind,
            childItem: [
                {
                    childItemType: 'diy',
                    description: DIY,
                },
                {
                    childItemType: 'none',
                    description: ImmediatelySend,
                },
            ],
        },
        {
            childItemType: 'time',
            description: SpecificDate,
        },
        {
            childItemType: 'none',
            description: PlanCreatedSendImmediately,
        },
    ],
};
export function getHierarchyFromItem(originItem) {
    var keys = Object.keys(originItem);
    var fatherItem;
    var childItem = [];
    for (var i = 0; i < keys.length; i++) {
        var item = originItem[keys[i]];
        item.name = keys[i];
        if (!fatherItem || fatherItem.name.length > item.name.length) {
            if (fatherItem) {
                childItem.push(fatherItem);
            }
            fatherItem = item;
        }
        else {
            childItem.push(item);
        }
    }
    fatherItem.items = childItem;
    return fatherItem;
}
export function getChooseValueFromItem(item) {
    var _a, _b, _c;
    if (item.name == 'basic.age') {
        var value = item.value.replace('[', '');
        value = value.replace(')', '');
        value = value.split(',');
        return { min: value[0], max: value[1] };
    }
    else if (item.name == 'basic.sex') {
        return { value: item.value };
    }
    else {
        return { id: ((_a = item === null || item === void 0 ? void 0 : item.items) === null || _a === void 0 ? void 0 : _a.length) > 0 ? ((_c = (_b = item.items[0]) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : '') : '', value: item.value };
    }
}
export function changeDescritionWithItem(item) {
    if (item.name.includes('disease')) {
        item.description = '诊断';
    }
    else if (item.name.includes('treatment')) {
        item.description = '处理';
    }
}
// 除掉首尾的大括号
export function deleteStartOrEndSymbol(str) {
    if (str.startsWith('{')) {
        // 除完'{'可能还有'}'
        return deleteStartOrEndSymbol(str.substring(1));
    }
    else if (str.endsWith('}')) {
        return str.substring(0, str.length - 1);
    }
    else {
        return str;
    }
}
export function getHMstr(delay) {
    var hour = Math.floor(delay / 3600);
    var min = (delay - hour * 3600) / 60;
    return (hour < 10 ? '0' + hour : hour) + ':' + (min < 10 ? '0' + min : min);
}
export function getStartTimeChoiceModel(chooseStartTime, action, ruleDoc, list) {
    var _a, _b, _c, _d, _e, _f, _g;
    var choiceModel = { childItemType: 'select', choiceModel: cloneDeep(FirstTimeModel), description: 'first' };
    if (chooseStartTime) { // 说明选择的是 患者与我绑定日期后
        choiceModel.choiceModel.choiceModel = (_a = choiceModel.choiceModel.childItem) === null || _a === void 0 ? void 0 : _a.filter(function (item) { return item.description == AfterPatientBind; })[0];
        // action.
        if (action.params.period == 0) { // 选择的是 立即发送
            choiceModel.choiceModel.choiceModel.choiceModel = (_c = (_b = choiceModel.choiceModel.choiceModel) === null || _b === void 0 ? void 0 : _b.childItem) === null || _c === void 0 ? void 0 : _c.filter(function (item) { return item.description == ImmediatelySend; })[0];
        }
        else { // 选择的是自定义
            choiceModel.choiceModel.choiceModel.choiceModel = (_e = (_d = choiceModel.choiceModel.choiceModel) === null || _d === void 0 ? void 0 : _d.childItem) === null || _e === void 0 ? void 0 : _e.filter(function (item) { return item.description == DIY; })[0];
            choiceModel.choiceModel.choiceModel.choiceModel.inputDay = action.params.period;
            choiceModel.choiceModel.choiceModel.choiceModel.inputHM = getHMstr(action.params.delay);
        }
    }
    else if (ruleDoc.meta.firstAtTime) { // 说明选择的是 选择特定日期
        choiceModel.choiceModel.choiceModel = (_f = choiceModel.choiceModel.childItem) === null || _f === void 0 ? void 0 : _f.filter(function (item) { return item.description == SpecificDate; })[0];
        choiceModel.choiceModel.choiceModel.inputTime = dayjs(ruleDoc.meta.firstAtTime).format('YYYY-MM-DD HH:mm');
    }
    else {
        choiceModel.choiceModel.choiceModel = (_g = choiceModel.choiceModel.childItem) === null || _g === void 0 ? void 0 : _g.filter(function (item) { return item.description == PlanCreatedSendImmediately; })[0];
    }
    var sourceIds = action.params.sourceMember.flatMap(function (item) { return item.sourceId; });
    return ({
        choiceModel: choiceModel,
        choiceContents: list.filter(function (item) { return sourceIds.includes(item.id); }),
    });
}
export function getChooseValuesKeyFromRules(ruleDoc, list) {
    var _a, _b;
    var rule = ruleDoc.rules[0];
    var chooseStartTime;
    var choseConditions = [];
    for (var i = 0; i < rule.match.must.length; i++) {
        var mustItem = rule.match.must[i];
        if (Object.keys(mustItem).includes('team.init_time') || Object.keys(mustItem).includes('diagnose.treatment.start')) {
            var fatherItem = getHierarchyFromItem(mustItem);
            chooseStartTime = fatherItem;
        }
        else {
            if (Object.keys(mustItem).length > 0) {
                var fatherItem = getHierarchyFromItem(mustItem);
                changeDescritionWithItem(fatherItem);
                // 分割诊断处理成多个数组
                if (fatherItem.name == 'diagnose.treatment' || fatherItem.name == 'diagnose.disease') {
                    var valueArray = fatherItem.value.split('},{');
                    var idArray = ((_a = fatherItem === null || fatherItem === void 0 ? void 0 : fatherItem.items) === null || _a === void 0 ? void 0 : _a.length) > 0 ? fatherItem.items[0].value.split('},{') : [];
                    var conditionArr = [];
                    for (var j = 0; j < valueArray.length; j++) {
                        var obj = cloneDeep(fatherItem);
                        obj.value = deleteStartOrEndSymbol(valueArray[j]);
                        if (idArray.length > j && ((_b = obj === null || obj === void 0 ? void 0 : obj.items) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                            obj.items[0].value = deleteStartOrEndSymbol(idArray[j]);
                        }
                        conditionArr.push({
                            chooseItem: obj,
                            chooseValue: getChooseValueFromItem(obj),
                        });
                    }
                    choseConditions.push.apply(choseConditions, __spreadArray([], __read(conditionArr)));
                }
                else {
                    if (fatherItem.name == 'basic.age' || fatherItem.name == 'basic.sex') {
                        var key = Object.keys(mustItem)[0];
                        var item = mustItem[key];
                        item.name = key;
                        choseConditions.push({
                            chooseItem: item,
                            chooseValue: getChooseValueFromItem(item),
                        });
                        changeDescritionWithItem(item);
                    }
                }
            }
        }
    }
    var choseScope = [];
    for (var i = 0; i < rule.match.should_1.length; i++) {
        var mustItem = rule.match.should_1[i];
        var fatherItem = getHierarchyFromItem(mustItem);
        choseScope.push(fatherItem);
    }
    var frequency = { frequency: 'CUSTOM', custom: [] };
    var _loop_1 = function (i) {
        var action = rule.actions[i];
        if (action.type == 'once') {
            frequency.frequency = 'CUSTOM';
        }
        else {
            frequency.frequency = 'LOOP';
        }
        var sourceIds = action.params.sourceMember.flatMap(function (item) { return item.sourceId; });
        frequency.custom.push({
            day: action.params.period,
            time: getHMstr(action.params.delay),
            contents: list.filter(function (item) { return sourceIds.includes(item.id); }),
        });
    };
    for (var i = 1; i < rule.actions.length; i++) {
        _loop_1(i);
    }
    if (frequency.custom.length == 0) {
        frequency.frequency = 'NONE';
    }
    var firstTime = getStartTimeChoiceModel(chooseStartTime, rule.actions[0], ruleDoc, list);
    return {
        firstTime: firstTime,
        choseConditions: choseConditions,
        choseScope: choseScope,
        frequency: frequency,
    };
}
export function getStartTimeDescriptionFromConditionss(firstTime) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var str = '';
    var choiceModel = firstTime === null || firstTime === void 0 ? void 0 : firstTime.choiceModel;
    if (((_b = (_a = choiceModel === null || choiceModel === void 0 ? void 0 : choiceModel.choiceModel) === null || _a === void 0 ? void 0 : _a.choiceModel) === null || _b === void 0 ? void 0 : _b.description) == AfterPatientBind) {
        str = str + AfterPatientBind + '   ';
        if (((_e = (_d = (_c = choiceModel === null || choiceModel === void 0 ? void 0 : choiceModel.choiceModel) === null || _c === void 0 ? void 0 : _c.choiceModel) === null || _d === void 0 ? void 0 : _d.choiceModel) === null || _e === void 0 ? void 0 : _e.description) == ImmediatelySend) {
            str = str + ImmediatelySend + '   ';
        }
        else {
            str = str + '第' + choiceModel.choiceModel.choiceModel.choiceModel.inputDay + '天' + choiceModel.choiceModel.choiceModel.choiceModel.inputHM;
        }
    }
    else if (((_g = (_f = choiceModel === null || choiceModel === void 0 ? void 0 : choiceModel.choiceModel) === null || _f === void 0 ? void 0 : _f.choiceModel) === null || _g === void 0 ? void 0 : _g.description) == SpecificDate) {
        str = str + SpecificDate + '   ' + choiceModel.choiceModel.choiceModel.inputTime + '  ';
    }
    else {
        str = (_k = str + ((_j = (_h = choiceModel === null || choiceModel === void 0 ? void 0 : choiceModel.choiceModel) === null || _h === void 0 ? void 0 : _h.choiceModel) === null || _j === void 0 ? void 0 : _j.description)) !== null && _k !== void 0 ? _k : '';
    }
    return str;
}
export function getConditionDescriptionFromConditionss(conditions) {
    var ageDes = '';
    var sexDes = '';
    var diseaseDes = '';
    var treatmentDes = '';
    for (var i = 0; i < conditions.length; i++) {
        var condi = conditions[i];
        if (condi.chooseItem.name == 'basic.age') {
            ageDes = '年龄: ' + condi.chooseValue.min + '-' + condi.chooseValue.max;
        }
        else if (condi.chooseItem.name == 'basic.sex') {
            sexDes = '性别: ' + condi.chooseValue.value;
        }
        else if (condi.chooseItem.name.includes('disease')) {
            if (!diseaseDes) {
                diseaseDes = '诊断: ' + condi.chooseValue.value;
            }
            else {
                diseaseDes = diseaseDes + ',' + condi.chooseValue.value;
            }
        }
        else if (condi.chooseItem.name.includes('treatment')) {
            if (!treatmentDes) {
                treatmentDes = '处理: ' + condi.chooseValue.value;
            }
            else {
                treatmentDes = treatmentDes + ',' + condi.chooseValue.value;
            }
        }
    }
    return {
        age: ageDes,
        sex: sexDes,
        disease: diseaseDes,
        treatment: treatmentDes,
    };
}
